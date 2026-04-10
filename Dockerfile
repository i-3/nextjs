FROM node:22-alpine AS base

# 1. Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
# Копируем db.ts, так как он в корне и может быть нужен для сборки
COPY db.ts ./ 
RUN npm ci

# 2. Сборка
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Финальный образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Устанавливаем psql клиент, чтобы создать таблицу при старте
RUN apk add --no-cache postgresql-client

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/db.ts ./db.ts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
# Переменные теперь берем только извне
CMD ["node", "server.js"]