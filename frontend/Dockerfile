FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN npm install -g npm@latest

# Enable package manager cache
RUN --mount=type=cache,target=/root/.npm \
    npm set cache /root/.npm && \
    npm cache verify

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure Tailwind config files are present
RUN ls -la
RUN cat tailwind.config.js
RUN cat postcss.config.js

# Enable package manager cache for build
RUN --mount=type=cache,target=/root/.npm \
    npm set cache /root/.npm && \
    npm cache verify && \
    npm run build

# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV=development

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "dev"] 