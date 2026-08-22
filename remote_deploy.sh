#!/bin/bash
set -e

cd ~/app

echo "Cleaning old node_modules..."
rm -rf node_modules server/node_modules client/node_modules

echo "Setting up environment variables..."
cat << 'EOF' > .env
DATABASE_URL=mysql://admin:YOUR_DB_PASSWORD@database-1.c5emuguqwelb.eu-north-1.rds.amazonaws.com:3306/reddot_db
JWT_SECRET=production_secret_do_not_share
VITE_APP_ID=local_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE
BEYOND_PRESENCE_AGENT_ID=YOUR_AGENT_ID
BEYOND_PRESENCE_API_KEY=YOUR_BEYOND_PRESENCE_API_KEY
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY
LIVEKIT_URL=wss://ai-support-agent-zgvnuk83.livekit.cloud
LIVEKIT_API_KEY=YOUR_LIVEKIT_API_KEY
LIVEKIT_API_SECRET=YOUR_LIVEKIT_API_SECRET
VITE_LIVEKIT_URL=wss://ai-support-agent-zgvnuk83.livekit.cloud
EOF

export PATH="/usr/bin:/usr/local/bin:$PATH"

echo "Installing dependencies..."
pnpm install

echo "Creating database if it doesn't exist..."
node -e "
const mysql = require('mysql2/promise');
async function init() {
  try {
    const connection = await mysql.createConnection({
      host: 'database-1.c5emuguqwelb.eu-north-1.rds.amazonaws.com',
      user: 'admin',
      password: 'YOUR_DB_PASSWORD',
      port: 3306
    });
    await connection.query('CREATE DATABASE IF NOT EXISTS reddot_db;');
    console.log('Database reddot_db is ready.');
    process.exit(0);
  } catch (e) {
    console.error('Failed to create database:', e);
    process.exit(1);
  }
}
init();
"

echo "Building application..."
pnpm run build

echo "Running database migrations..."
pnpm run db:push

echo "Starting application with PM2..."
pm2 start ecosystem.config.cjs --env production
pm2 save

echo "Done!"
