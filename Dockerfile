FROM node:22-alpine AS base

# 1. Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# 2. Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Генерируем клиент Prisma
RUN npx prisma generate
RUN npm run build

# 3. Финальный образ (Runner)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем только то, что нужно для работы
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
# КРИТИЧЕСКИЙ МОМЕНТ: Копируем конфиг Prisma 7 в финальный образ
COPY --from=builder /app/prisma.config.js ./ 

# Настройка standalone режима Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Команда запуска теперь берется из docker-compose или deploy.yml
CMD ["node", "server.js"]