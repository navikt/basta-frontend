FROM node:22-alpine AS builder
WORKDIR /home/app
RUN corepack enable

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY ./ ./
RUN pnpm run build

FROM node:22-alpine
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app
RUN corepack enable

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /home/app/dist/ ./dist/
COPY ./api/src ./api/src

COPY navcerts.crt /usr/local/share/ca-certificates/
RUN apk add --no-cache ca-certificates
RUN	update-ca-certificates

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
CMD ["node", "api/src/server.js"]
