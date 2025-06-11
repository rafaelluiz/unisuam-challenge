# Desafio Técnico - Unisuam

## Configuração Inicial

### Backend (Laravel)

Algumas pastas importantes do Laravel **não estão versionadas** no repositório e precisam ser criadas manualmente:

```bash
mkdir -p backend/storage backend/bootstrap/cache
chmod -R 775 backend/storage backend/bootstrap/cache
```

Estas pastas devem ter permissão de escrita para o Laravel funcionar corretamente.

### Frontend (Next.js)

A pasta `node_modules` não está no repositório, então antes de rodar o frontend localmente, execute:

Obs.: Necessário ter o node instalado na versão `v21.7.3` ou superior.

```bash
cd frontend
npm install
```

### Rodando com Docker Compose

Para subir o projeto completo com Docker, execute:

```bash
docker compose up --build
```

Isso vai construir as imagens e iniciar os containers do backend e frontend.

## Observações

- Certifique-se que o banco de dados esteja rodando e acessível para o backend.
- O backend expõe a aplicação Laravel na porta `8000`.
- O frontend expõe a aplicação Next.js na porta `3000`.
- Hot reload está configurado no frontend para refletir mudanças automaticamente.

---

Qualquer dúvida, fique à vontade para perguntar!
