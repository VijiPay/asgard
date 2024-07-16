FROM node:20-slim as build
RUN apt-get update && apt-get install -y openssl
COPY package.json pnpm-lock.yaml tsconfig.base.json tsconfig.build.json .swcrc vitest.config.mts tsoa.json asgard/
COPY /src asgard/src
RUN npm i -g pnpm typescript
WORKDIR /asgard
RUN pnpm install --frozen-lockfile
COPY prisma/schema.prisma ./prisma/
RUN pnpm prisma generate

RUN pnpm build
COPY . .

FROM --platform=arm64 node:20-slim as install
RUN apt-get update && apt-get install -y openssl
RUN npm i -g pnpm
WORKDIR /asgard
COPY --from=build /asgard/package.json .
COPY --from=build /asgard/dist/src .
RUN pnpm install --prod

ARG GIT_SHA
ENV GIT_SHA $GIT_SHA

EXPOSE 4343
CMD ["pnpm", "start"]