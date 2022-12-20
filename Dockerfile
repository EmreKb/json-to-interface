FROM node:18-alpine AS builder

WORKDIR /usr/app/

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/app/dist/json-to-interface/ .
