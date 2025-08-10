# Next.js + Strapi Boilerplate

A modern full-stack boilerplate with Next.js 15 and Strapi 5, using TypeScript and PostgreSQL.

## Features

- 🚀 Next.js 15.3 with App Router
- 📝 TypeScript for type safety
- 🔒 Strapi 5.12 as headless CMS
- 🐘 PostgreSQL database
- 🐳 Docker setup for development
- 🔄 Hot reloading for both frontend and backend

## Prerequisites

- Docker and Docker Compose V2 (using `docker compose` command)
- Node.js 18.x or later
- npm 6.x or later

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/nextjs-strapi-boilerplate.git
cd nextjs-strapi-boilerplate
\`\`\`

2. Start the development environment:
\`\`\`bash
docker compose up -d
\`\`\`

3. Access the applications:
- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin

## Project Management

This project uses a root `package.json` to manage both frontend and backend applications. Here are the available commands:

### Initial Setup
```bash
# First, install root dependencies
npm install

# Then install all dependencies (frontend & backend)
npm run install:all
```

### Development Commands
```bash
# Run complete local development environment in Docker (with logs in terminal)
npm run dev:local

# Run complete local development environment in Docker (detached mode)
npm run dev:local:detach

# Run both frontend and backend directly (without Docker)
npm run dev

# Run frontend or backend separately (without Docker)
npm run dev:frontend
npm run dev:backend
```

> Note: For local development, it's recommended to use `npm run dev:local` which runs everything in Docker containers. This ensures consistent environment and proper database connectivity.

### Build Commands
```bash
# Build both applications
npm run build

# Build frontend or backend separately
npm run build:frontend
npm run build:backend
```

### Production Commands
```bash
# Start both applications in production mode
npm run start

# Start frontend or backend separately
npm run start:frontend
npm run start:backend
```

### Docker Commands
```bash
# Development
npm run docker:up      # Start all containers
npm run docker:down    # Stop all containers
npm run docker:build   # Build all images
npm run docker:logs    # View logs

# Production
npm run prod:up        # Start production containers
npm run prod:down      # Stop production containers
npm run prod:build     # Build production images
npm run prod:logs      # View production logs
```

### Database Commands
```bash
# Create database backup
npm run backup

# Run database migration
npm run db:migrate
```

### Utility Commands
```bash
# Clean all build files and node_modules
npm run clean

# Clean frontend or backend separately
npm run clean:frontend
npm run clean:backend
```

## Project Structure

\`\`\`
nextjs-strapi-boilerplate/
├── frontend/              # Next.js application
│   ├── src/              # Source files
│   ├── public/           # Static files
│   └── Dockerfile        # Frontend Docker configuration
├── backend/              # Strapi application
│   ├── config/           # Strapi configurations
│   ├── src/              # Source files
│   └── Dockerfile        # Backend Docker configuration
├── docker-compose.yml    # Docker compose configuration
└── .env                  # Environment variables
\`\`\`

## Development

- Frontend development server runs on port 3000
- Strapi backend runs on port 1337
- PostgreSQL database runs on port 5432

## Environment Variables

The following environment variables are required:

\`\`\`env
# PostgreSQL
POSTGRES_DB=strapi
POSTGRES_USER=strapi
POSTGRES_PASSWORD=strapi123

# Strapi
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-api-token-salt
\`\`\`

## Production Deployment Configuration

Before deploying to production, you need to modify the following files:

### 1. Frontend Configuration (`frontend/.env.production`)
```env
# Change API URL to your production domain
NEXT_PUBLIC_STRAPI_API_URL=https://api.your-domain.com
```

### 2. Backend Configuration (`backend/.env.production`)
```env
# Database connection
DATABASE_HOST=your-production-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-production-db-name
DATABASE_USERNAME=your-production-db-user
DATABASE_PASSWORD=your-strong-password

# Admin panel URL
ADMIN_URL=https://admin.your-domain.com

# Security tokens (generate new ones for production!)
JWT_SECRET=your-32-char-jwt-secret
ADMIN_JWT_SECRET=your-32-char-admin-jwt-secret
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-32-char-api-token-salt
```

### 3. Docker Production Configuration (`docker-compose.prod.yml`)
```yaml
# Update service names if needed
services:
  frontend:
    # Add your SSL certificates
    volumes:
      - ./ssl:/etc/nginx/ssl
    environment:
      - SSL_CERTIFICATE=/etc/nginx/ssl/cert.pem
      - SSL_CERTIFICATE_KEY=/etc/nginx/ssl/key.pem

  backend:
    # Add rate limiting if needed
    environment:
      - STRAPI_RATE_LIMIT=100
      - STRAPI_RATE_LIMIT_WINDOW=15

  postgres:
    # Configure backup volumes
    volumes:
      - ./backups:/backups
```

### 4. Nginx Configuration (if using reverse proxy)
Create `nginx/prod.conf`:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }

    # Backend Admin
    location /admin {
        proxy_pass http://backend:1337/admin;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}
```

### 5. Security Considerations
1. Generate strong passwords and secrets:
   ```bash
   # Generate random 32 character string
   openssl rand -base64 32
   ```

2. Set up SSL certificates:
   - Use Let's Encrypt or your SSL provider
   - Place certificates in `./ssl/` directory

3. Configure firewalls:
   - Allow only ports 80 (HTTP), 443 (HTTPS)
   - Restrict PostgreSQL port (5432) to backend service only

4. Set up regular backups:
   ```bash
   # Add to crontab
   0 0 * * * /path/to/project/scripts/backup.sh
   ```

### 7. Database Migration
The project includes scripts for database backup and migration between environments.

#### Creating Database Backup
To create a backup of your database:
```bash
./scripts/backup.sh
```
This will:
- Create a backup file in the `backups` directory with timestamp
- Remove old backups if BACKUP_RETENTION_DAYS is set in .env.production
- Backup file format: `db_backup_YYYYMMDD_HHMMSS.dump`

#### Migrating Data from Local to Production
Before migrating data to production, follow these safety steps:

1. Create a backup of the production database:
```bash
./scripts/backup.sh
```

2. Run the migration script:
```bash
./scripts/db-migrate.sh
```

The script will:
- Create a backup of your local database
- Ask for production database credentials:
  - Host
  - Port (default: 5432)
  - Database name
  - Username
  - Password
- Test the connection to production database
- Perform the migration

⚠️ Important warnings:
- This process will OVERWRITE all data in the target database
- Ensure schema compatibility between environments
- Verify that no one is actively using the production database during migration
- Make sure you have proper database access rights
- Always create a backup before migration

In case of migration failure, you can restore the production database from the backup created in step 1.

### 8. Monitoring Setup (Optional)
1. Install monitoring tools:
   ```bash
   # Install prometheus & grafana
   docker compose -f docker-compose.monitoring.yml up -d
   ```

## Hosting Requirements

### Minimum Server Requirements
- CPU: 2 vCPU cores (4 recommended for production)
- RAM: 4GB (8GB recommended for production)
- Storage: 20GB SSD (depends on media files volume)
- OS: Ubuntu 20.04 LTS or later

### Deployment Architecture
By default, this boilerplate is designed for monolithic deployment where all services (Frontend, Strapi, and PostgreSQL) are hosted on the same server:

```
[Server]
├── frontend (Next.js) -> :3000
├── backend (Strapi) -> :1337
└── database (PostgreSQL) -> :5432
```

All services are managed through Docker Compose, sharing the same network and volume structure. This approach:
- Simplifies deployment and maintenance
- Reduces network latency between services
- Makes configuration and SSL setup easier
- Reduces hosting costs

For larger scale applications, you can still separate services later by modifying the docker-compose configuration.

### Alternative Deployment (Without Docker)
If your hosting provider doesn't support Docker, you can deploy the applications separately:

#### Frontend (Next.js) Deployment
1. Build the frontend:
```bash
cd frontend
npm install
npm run build
```

2. Start the production server:
```bash
npm start
```

Requirements:
- Node.js 18.x or later
- npm 6.x or later
- Process manager (PM2 recommended):
```bash
npm install -g pm2
pm2 start npm --name "frontend" -- start
```

#### Backend (Strapi) Deployment
1. Build Strapi:
```bash
cd backend
npm install
npm run build
```

2. Start the production server:
```bash
NODE_ENV=production npm start
```

Requirements:
- Node.js 18.x or later
- npm 6.x or later
- Process manager (PM2 recommended):
```bash
pm2 start npm --name "backend" -- start
```

#### Database (PostgreSQL) Setup
1. Install PostgreSQL 14 or later:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

2. Create database and user:
```bash
sudo -u postgres psql
CREATE DATABASE strapi;
CREATE USER strapi WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE strapi TO strapi;
```

#### Nginx Configuration (without Docker)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend Admin
    location /admin {
        proxy_pass http://localhost:1337/admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Media files
    location /uploads {
        proxy_pass http://localhost:1337/uploads;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Environment Setup
1. Frontend (.env.production):
```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-domain.com
```

2. Backend (.env):
```env
HOST=localhost
PORT=1337
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_password
```

#### Backup Setup (without Docker)
Create a backup script (backup.sh):
```bash
#!/bin/bash
BACKUP_DIR="/path/to/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U strapi -d strapi -F c > "$BACKUP_DIR/db_backup_$TIMESTAMP.dump"
```

Add to crontab:
```bash
0 0 * * * /path/to/backup.sh
```

### Software Requirements
- Docker Engine 20.10.x or later
- Docker Compose V2
- Nginx (for reverse proxy)
- Let's Encrypt or other SSL certificate provider

### Network Requirements
- Dedicated IPv4 address
- Open ports:
  - 80 (HTTP)
  - 443 (HTTPS)
  - 5432 (PostgreSQL, internal only)
  - 1337 (Strapi, internal only)
  - 3000 (Next.js, internal only)

### Database Requirements
- PostgreSQL 14 or later
- Recommended storage: 10GB (adjustable based on data volume)
- Regular backup storage: Additional 5GB minimum

### Recommended Hosting Providers
1. Cloud Platforms:
   - DigitalOcean (Droplet or Kubernetes)
   - AWS (EC2 or ECS)
   - Google Cloud Platform
   - Microsoft Azure

2. Managed Services:
   - Heroku
   - Platform.sh
   - DigitalOcean App Platform
   - Vercel (for Next.js frontend)
   - Railway

### Scaling Considerations
- Load balancer support for horizontal scaling
- Container orchestration capability (Kubernetes/Swarm)
- CDN support for static assets
- Managed database service option
- Storage scaling capability for media files

## Shared Hosting Deployment Guide

For deployment to a virtual hosting environment where you only have directory access and database credentials, follow these steps:

### 1. Project Preparation
```bash
# On your local machine
npm run install:all    # Install dependencies
npm run build         # Build frontend and backend
```

### 2. Prepare Files for Upload
```bash
# Create archive with built files
frontend-dist/
├── .next/            # Built Next.js application
├── public/           # Static files
├── package.json
└── next.config.js

backend-dist/
├── build/            # Built Strapi application
├── config/
├── public/
├── package.json
└── .env             # Environment settings
```

### 3. Environment Setup

Create `backend-dist/.env`:
```env
HOST=localhost
PORT=1337
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-user
DATABASE_PASSWORD=your-db-password
```

Create `frontend-dist/.env.production`:
```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-domain.com
```

### 4. Upload to Hosting

1. Upload `frontend-dist` contents to `public_html/frontend`
2. Upload `backend-dist` contents to `public_html/backend`

### 5. Install Dependencies on Hosting
```bash
# In frontend directory
npm install --production

# In backend directory
npm install --production
```

### 6. PM2 Setup
```bash
# Install PM2 globally
npm install -g pm2

# Start frontend
cd ~/public_html/frontend
pm2 start npm --name "frontend" -- start

# Start backend
cd ~/public_html/backend
pm2 start npm --name "backend" -- start

# Save PM2 processes
pm2 save

# Setup startup script (if available)
pm2 startup
```

### 7. Nginx Configuration
Contact your hosting support to configure Nginx:
```nginx
# Frontend configuration
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

# Strapi API configuration
location /api/ {
    proxy_pass http://localhost:1337;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

# Strapi Admin configuration
location /admin {
    proxy_pass http://localhost:1337/admin;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### 8. Verify Deployment
1. Open https://your-domain.com - should display frontend
2. Open https://your-domain.com/admin - should display Strapi admin panel
3. Test API: https://your-domain.com/api/[endpoint]

### 9. Troubleshooting
- Check PM2 logs: `pm2 logs`
- Verify file permissions
- Ensure ports 3000 and 1337 are available
- Test database connection

## License

MIT 