FROM node:10-alpine as builder
WORKDIR /home/app

COPY ./package* ./
COPY ./ ./
RUN npm run build

FROM node:10-alpine
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY ./package* ./
COPY --from=builder /home/app/node_modules/ ./node_modules/
COPY --from=builder /home/app/dist/ ./dist/
COPY ./api/src ./api/src

COPY navcerts.crt /usr/local/share/ca-certificates/
RUN apk add --no-cache ca-certificates
RUN	update-ca-certificates

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
CMD ["node", "api/src/server.js"]