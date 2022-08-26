# Production Dockerfile
# This Dockerfile allows to build a production Docker image of the NestJS application.
# It can be used to Amazon ECS task definitions to launch containers.

FROM node:16.5-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm run build && pnpm prune --production

# ---

FROM node:16.5-alpine

WORKDIR /app
COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

WORKDIR /app/dist/apps/api-server/
EXPOSE 3000

CMD [ "node", "main.js" ]