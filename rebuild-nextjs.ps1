# PowerShell script for rebuilding Next.js container
Write-Host "🔄 Rebuilding Next.js container..." -ForegroundColor Yellow

# Stop containers
Write-Host "⏹️  Stopping containers..." -ForegroundColor Blue
docker-compose down

# Rebuild Next.js container
Write-Host "🔨 Building Next.js container..." -ForegroundColor Blue
docker-compose build --no-cache nextjs

# Start containers
Write-Host "🚀 Starting containers..." -ForegroundColor Blue
docker-compose up -d

# Show status
Write-Host "📋 Container status:" -ForegroundColor Green
docker-compose ps

Write-Host "✅ Done! Next.js container rebuilt successfully!" -ForegroundColor Green
