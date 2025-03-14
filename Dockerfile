FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci
# RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# RUN chmod -R a+x node_modules
# RUN chmod -R 755 ./
# RUN chown -R node:node ./
RUN npm run build


FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

RUN chmod -R 755 /app/package.json
RUN chown -R node:node /app/package.json

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# RUN npm run build
CMD ["node", "server.ts"]
# CMD ["npm", "start"]