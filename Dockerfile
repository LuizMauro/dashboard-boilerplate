# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de produção usando um servidor estático
FROM nginx:alpine

# Remove a config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos de build para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma config custom de nginx (para SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]