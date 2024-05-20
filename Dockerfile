FROM node:20-slim as build

RUN npm i -g pnpm

WORKDIR /asgard

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN pnpx prisma generate

COPY . .

EXPOSE 4343
CMD ["pnpm", "start"]