#!/bin/bash
set -e

echo "Updating packages..."
sudo apt-get update
sudo apt-get upgrade -y

echo "Installing NGINX..."
sudo apt-get install -y nginx

echo "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Installing PM2 and pnpm..."
sudo npm install -g pm2 pnpm

echo "Setting up NGINX proxy..."
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo nginx -t
sudo systemctl restart nginx

echo "Server setup complete!"
