FROM node:20-slim as build
COPY package.json pnpm-lock.yaml tsconfig.base.json tsconfig.build.json tsoa.json asgard/
RUN apt-get update && apt-get install -y openssl
RUN npm i -g pnpm typescript
RUN pnpm add typeorm-ts-node-commonjs
WORKDIR /asgard
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm rimraf dist && pnpm swc ./src --copy-files -d dist

FROM node:20-slim as install
WORKDIR /asgard
COPY --from=build /asgard/package.json /asgard/pnpm-lock.yaml ./
COPY --from=build /asgard/dist ./dist
RUN npm i -g pnpm typescript
RUN pnpm install

EXPOSE 4343
CMD ["pnpm", "start"]