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
    npm ci

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Enable package manager cache for build
RUN --mount=type=cache,target=/root/.npm \
    npm set cache /root/.npm && \
    npm cache verify && \
    npm run build

# Production image, copy all the files and run strapi
FROM base AS runner
ENV NODE_ENV=development

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 strapi
USER strapi

COPY --from=builder --chown=strapi:nodejs /app/dist ./dist
COPY --from=builder --chown=strapi:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:nodejs /app/package.json ./package.json
COPY --from=builder --chown=strapi:nodejs /app/src ./src
COPY --from=builder --chown=strapi:nodejs /app/config ./config
COPY --from=builder --chown=strapi:nodejs /app/public ./public

EXPOSE 1337

CMD ["npm", "run", "develop"] 