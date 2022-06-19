FROM node:14-alpine AS build-env

WORKDIR /app
COPY . /app
RUN npm ci && npm run build

FROM nginx:1.21.4-alpine

COPY --from=build-env /app/build /usr/share/nginx/html

COPY ./nginx/server.conf /etc/nginx/conf.d/default.conf

RUN chmod 755 -R /root

CMD ["nginx", "-g", "daemon off;"]
