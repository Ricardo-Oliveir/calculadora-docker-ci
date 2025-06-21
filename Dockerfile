# Usa a imagem oficial do Nginx como base
FROM nginx:alpine

# Copia todo o conteúdo da pasta atual para a pasta do servidor web dentro do contêiner
COPY . /usr/share/nginx/html

# Expõe a porta 80 (padrão para web)
EXPOSE 80

# Comando que inicia o servidor Nginx quando o contêiner rodar
CMD ["nginx", "-g", "daemon off;"]