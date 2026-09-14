ARG PNPM_VERSION=11.25.0

FROM node:24-alpine AS base
RUN apk upgrade --no-cache
RUN apk add --no-cache ca-certificates

FROM base AS builder
ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /home/app

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./ ./
ENV CI=true
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY --from=builder /home/app/dist/ ./dist/
COPY ./api/src ./api/src

COPY navcerts.crt /usr/local/share/ca-certificates/
RUN	update-ca-certificates

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
CMD ["node", "api/src/server.js"]
