
FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 as builder
FROM base as builder

RUN apk add --update --no-cache \
    python3 \
    make \
    g++ 
    
WORKDIR /usr/src/app

COPY package*.json ./

COPY . /app

RUN npm install

EXPOSE 4051

CMD [ "npm", "start" ]
