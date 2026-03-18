#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/ai-radar"
WEB_ROOT="/var/www/html"
BRANCH="${BRANCH:-master}"
APP_USER="${APP_USER:-admin}"

run_as_app_user() {
  if [ "$(id -un)" = "$APP_USER" ]; then
    "$@"
  else
    sudo -u "$APP_USER" "$@"
  fi
}

echo "==== $(date '+%Y-%m-%d %H:%M:%S') start update ===="

cd "$APP_DIR"

run_as_app_user git fetch origin "$BRANCH"
run_as_app_user git reset --hard "origin/$BRANCH"
run_as_app_user npm ci
run_as_app_user npm run generate:data
run_as_app_user npm run build

sudo rm -rf "${WEB_ROOT:?}/"*
sudo cp -r "$APP_DIR/out/"* "$WEB_ROOT/"
sudo systemctl restart nginx

echo "==== $(date '+%Y-%m-%d %H:%M:%S') update done ===="
