FROM node:20-slim as build

RUN npm i -g pnpm

WORKDIR /asgard

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 8080

CMD ["pnpm", "start"]