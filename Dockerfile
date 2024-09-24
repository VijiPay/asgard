FROM node:22.8.0-alpine3.20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm && corepack install -g pnpm@latest-9 && npm install -g typescript
WORKDIR /asgard
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY /types asgard/types

FROM base AS deps
WORKDIR /asgard
RUN pnpm install --frozen-lockfile

FROM base AS production-deps
WORKDIR /asgard
RUN pnpm install --frozen-lockfile --prod

FROM base AS build
COPY --from=deps /asgard/node_modules /asgard/node_modules
ADD . .
RUN node ace build
COPY swagger.yml build/

FROM base
ENV NODE_ENV=production
WORKDIR /asgard
COPY --from=production-deps /asgard/node_modules /asgard/node_modules
COPY --from=build /asgard/build /asgard

ARG GIT_SHA
ENV GIT_SHA=$GIT_SHA

EXPOSE ${PORT}
CMD ["node", "./bin/server.js"]