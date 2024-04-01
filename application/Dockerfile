# Baseia na imagem oficial do Node
FROM node:16-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro para aproveitar o cache do Docker
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia os demais arquivos do projeto
COPY . .

# Expõe a porta 3000 para acesso ao servidor de desenvolvimento
EXPOSE 3000

# Inicia a aplicação React
CMD ["npm", "start"]
