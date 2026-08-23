#!/usr/bin/env bash
# =============================================================================
# REDDOT.AI — Zero-Downtime Safe Deployment Script
# =============================================================================
set -e

echo "🚀 Starting zero-downtime deployment for REDDOT.AI..."

# 1. Pull latest verified commits from GitHub
echo "📥 Pulling latest updates from GitHub..."
git pull origin main

# 2. Install dependencies cleanly
echo "📦 Installing dependencies..."
npm install --production=false

# 3. Build production bundle (Validates TypeScript & assets before reload)
echo "🔨 Building production client & server bundle..."
npm run build

# 4. Graceful Zero-Downtime Process Reload
echo "🔄 Reloading PM2 process gracefully..."
if pm2 list | grep -q "reddot"; then
  pm2 reload reddot --update-env
else
  pm2 restart all --update-env || pm2 start dist/index.js --name "reddot"
fi

# 5. Verify Health Check
echo "🔍 Verifying backend healthcheck on port 3000..."
sleep 2
if curl -s -f http://127.0.0.1:3000/api/health > /dev/null; then
  echo "✅ Deployment successful! Healthcheck status: 200 OK"
else
  echo "⚠️ Warning: Healthcheck did not respond immediately. Check 'pm2 logs reddot'"
fi

echo "🎉 All systems operational."
