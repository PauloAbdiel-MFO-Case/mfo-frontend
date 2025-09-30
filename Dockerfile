# Usa a imagem node:20-alpine como base
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Cria o usuário e o grupo com menos privilégios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copia os arquivos de definição de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o nosso novo script de inicialização e o torna executável
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Define o ponto de entrada do container para ser o nosso script
ENTRYPOINT ["entrypoint.sh"]

# Expõe a porta 3000
EXPOSE 3000

# Define o comando padrão que o entrypoint.sh irá executar
CMD ["npm", "run", "dev"]