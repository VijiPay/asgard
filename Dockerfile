FROM node:20-slim AS build
RUN apt-get update && apt-get install -y openssl
COPY package.json package-lock.json start.sh tsoa.json asgard/
COPY . ./asgard
WORKDIR /asgard
RUN npm install --frozen-lockfile
RUN node ace build

FROM node:20-slim AS install
RUN apt-get update && apt-get install -y openssl
WORKDIR /asgard
COPY --from=build /asgard/package.json .
COPY --from=build /asgard/build ./build
COPY package*.json ./
RUN npm ci

ARG GIT_SHA
ENV GIT_SHA $GIT_SHA

EXPOSE 4343

RUN ln -s build/ace.js ace

COPY start.sh /asgard/start.sh
RUN chmod +x /asgard/start.sh

CMD ["./start.sh"]