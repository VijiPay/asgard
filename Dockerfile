FROM node:20-slim as build
WORKDIR /asgard
COPY package.json  ./
RUN yarn install
COPY . .
EXPOSE 4343

CMD ["yarn", "start"]