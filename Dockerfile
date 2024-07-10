FROM node:20-slim as build
RUN apt-get update && apt-get install -y openssl
RUN npm i -g pnpm typescript
WORKDIR /asgard
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM --platform=linux/amd64 node:20-slim as install
WORKDIR /asgard
COPY --from=build /asgard/package.json /asgard/pnpm-lock.yaml ./
COPY --from=build /asgard/dist ./dist
RUN pnpm install --prod

EXPOSE 4343
CMD ["pnpm", "start"]