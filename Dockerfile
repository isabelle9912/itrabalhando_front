# Usa uma imagem base do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração do projeto
COPY package.json tsconfig.json ./

# Instala as dependências
RUN npm install

# Copia o código-fonte para o container
COPY src ./src
#COPY public ./public

# Expõe a porta 5173 (porta do Vite)
EXPOSE 5173

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]