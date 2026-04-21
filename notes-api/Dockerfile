FROM node:22-alpine AS build

WORKDIR /notes-api

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /notes-api

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node --from=build /notes-api/dist ./dist

USER node

EXPOSE 3000
CMD ["node", "dist/main.js"]
