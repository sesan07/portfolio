FROM node:16.16-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY ./src ./src
COPY ./server.ts .
COPY ./angular.json .
COPY ./tsconfig.json .
COPY ./tsconfig.app.json .
COPY ./tsconfig.server.json .

CMD [ "npm", "run", "dev:ssr" ]

EXPOSE 4200