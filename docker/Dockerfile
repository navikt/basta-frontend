FROM node:24-alpine

WORKDIR /src
ADD ./dist .

EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "api/src/server.js"]