ARG NODE_DEV_IMAGE=europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-dev
ARG NODE_RUNTIME_IMAGE=europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim
ARG PNPM_VERSION=12.15.0

FROM ${NODE_DEV_IMAGE} AS base
ARG PNPM_VERSION
USER root
RUN npm install --global pnpm@${PNPM_VERSION}
WORKDIR /home/app

FROM base AS builder
COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
ENV CI=true
RUN pnpm install --frozen-lockfile
COPY ./ ./
RUN pnpm run build

FROM base AS production-dependencies
COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

FROM ${NODE_RUNTIME_IMAGE}
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app
COPY --from=production-dependencies --chown=65532:65532 /home/app/node_modules/ ./node_modules/
COPY --chown=65532:65532 ./package.json ./
COPY --from=builder --chown=65532:65532 /home/app/dist/ ./dist/
COPY --chown=65532:65532 ./api/src ./api/src

COPY navcerts.crt /usr/local/share/ca-certificates/
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/navcerts.crt

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
USER 65532:65532
ENTRYPOINT ["node"]
CMD ["api/src/server.js"]
