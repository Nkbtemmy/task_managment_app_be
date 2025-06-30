# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# # Stage 2: Production
# FROM node:20-alpine

# WORKDIR /app

# COPY --from=builder /app/package*.json ./
# RUN npm ci --omit=dev
# COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# # COPY --from=builder /app/node_modules/ts-node ./node_modules/ts-node
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma

# ENV NODE_ENV=production

# EXPOSE 3000

CMD ["npm", "start"]