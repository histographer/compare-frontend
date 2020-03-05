# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM cytomine/nginx:v1.2.0 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
ADD nginx.conf /usr/local/nginx/conf/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
