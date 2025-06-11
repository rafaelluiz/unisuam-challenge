FROM php:8.2-fpm

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev libpq-dev zip \
    netcat-openbsd \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Instala o Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www

# Cria as pastas obrigatórias para Laravel antes de copiar os arquivos
RUN mkdir -p storage bootstrap/cache

# Copia os arquivos do projeto (se houver)
COPY backend /var/www

# Ajusta permissões para as pastas criadas e todo o código copiado
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www && chmod -R 755 /var/www


# Instala o Laravel se ainda não estiver instalado
RUN if [ ! -f artisan ]; then \
    mkdir -p /tmp/laravel && \
    composer create-project --prefer-dist laravel/laravel /tmp/laravel && \
    cp -R /tmp/laravel/. /var/www && \
    rm -rf /tmp/laravel; \
fi


# Expõe a porta padrão do PHP-FPM
EXPOSE 9000

# Copia o entrypoint
COPY infra/dockerfiles/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm"]
