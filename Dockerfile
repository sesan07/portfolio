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
RUN npm run build:prod

CMD [ "npm", "run", "serve:prod" ]

EXPOSE 4000