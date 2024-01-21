FROM --platform=linux/amd64 node:18-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY .env.dev .env

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start:prod" ]