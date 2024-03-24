FROM node:20.11 AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM node

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/uploads ./dist/uploads

CMD ["node", "dist/main.js"]