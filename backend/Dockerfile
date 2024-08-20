
FROM node:20.16.0-alpine3.20 AS local

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV NODE_ENV=dev

CMD ["node", "server.js"]
