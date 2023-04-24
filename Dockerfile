FROM node:16.16 as build

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY ./src ./src
COPY ./angular.json .
COPY ./tsconfig.json .
COPY ./tsconfig.app.json .
RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/portfolio /usr/share/nginx/html

EXPOSE 80