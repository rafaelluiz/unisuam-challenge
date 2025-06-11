#!/bin/bash

# Garante que as pastas necessárias existam e tenham permissões corretas
mkdir -p \
    bootstrap/cache \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs

# Ajusta permissões
chown -R www-data:www-data storage bootstrap
chmod -R 775 storage bootstrap

# Espera o banco de dados estar pronto
until nc -z -v -w30 database 5432; do
  echo "Aguardando o banco de dados estar pronto..."
  sleep 2
done

# Instala dependências
composer install --no-interaction --prefer-dist

# Gera o .env se necessário
if [ ! -f .env ]; then
  cp .env.example .env
  php artisan key:generate
fi

# Permissões antes de qualquer coisa
chown -R www-data:www-data storage bootstrap/cache

# Executa migrate apenas se ainda não foi feito
if ! php artisan migrate:status > /dev/null 2>&1; then
  echo "Rodando migrations pela primeira vez..."
  php artisan migrate --force
else
  echo "Migrations já foram aplicadas, pulando."
fi

# Sobe o servidor Laravel
php artisan serve --host=0.0.0.0 --port=8000
