FROM node:22-alpine
WORKDIR /app
COPY index.html chat.html manus-routes.json server.mjs ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.mjs"]
