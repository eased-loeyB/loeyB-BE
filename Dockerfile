FROM node:12.19.0-alpine3.9 AS build

WORKDIR /loeyb/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/apps/gateway/main"]


