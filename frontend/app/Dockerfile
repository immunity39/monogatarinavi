FROM node:21-bullseye-slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install && \
    npm install --save mapbox-gl @types/mapbox-gl @mapbox/mapbox-gl-language && \
    npm install react-icons --save

COPY . .
