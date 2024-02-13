FROM node:20-alpine

WORKDIR /src

COPY package*.json /src/

RUN npm ci

COPY . ./src

CMD ["npm", "run", "dev"]
