FROM node:20-slim

# Alinha com a raiz do projeto Next.js
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY frontend/package*.json ./

RUN npm install

# Copia o restante (vai ser sobrescrito pelo volume depois)
COPY frontend .

EXPOSE 3000

CMD ["npm", "run", "dev"]
