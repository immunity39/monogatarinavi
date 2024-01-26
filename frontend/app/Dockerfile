FROM node:21-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
