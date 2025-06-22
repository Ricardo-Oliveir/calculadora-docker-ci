
FROM nginx:alpine


COPY ./Calculadora /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]