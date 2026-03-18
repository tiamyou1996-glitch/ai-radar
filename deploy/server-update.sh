#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/ai-radar"
WEB_ROOT="/var/www/html"
BRANCH="${BRANCH:-master}"

echo "==== $(date '+%Y-%m-%d %H:%M:%S') start update ===="

cd "$APP_DIR"

git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
npm ci
npm run generate:data
npm run build

sudo rm -rf "${WEB_ROOT:?}/"*
sudo cp -r "$APP_DIR/out/"* "$WEB_ROOT/"
sudo systemctl restart nginx

echo "==== $(date '+%Y-%m-%d %H:%M:%S') update done ===="
