FROM node:lts-alpine as build

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install && npm run build && rm -rf node_modules

FROM node:lts-alpine

COPY --from=build --chown=node:node /usr/src/app /usr/src/app

WORKDIR /usr/src/app
USER node

RUN npm install --prod

ENV SECRET_JWT eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0
ENV MONGO_URL mongodb://localhost:27017/
ENV MONGO_DATABASE bastet
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
