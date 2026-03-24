#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/ai-radar"
LOG_FILE="/var/log/ai-radar-update.log"
CRON_EXPR="${CRON_EXPR:-5 9 * * *}"
CRON_FILE="/etc/cron.d/ai-radar-update"
CRON_LINE="$CRON_EXPR root /bin/bash $APP_DIR/deploy/server-update.sh >> $LOG_FILE 2>&1"

mkdir -p "$APP_DIR"
sudo touch "$LOG_FILE"
sudo chmod 644 "$LOG_FILE"

printf '%s\n' "SHELL=/bin/bash" | sudo tee "$CRON_FILE" >/dev/null
printf '%s\n' "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" | sudo tee -a "$CRON_FILE" >/dev/null
printf '%s\n' "$CRON_LINE" | sudo tee -a "$CRON_FILE" >/dev/null
sudo chmod 644 "$CRON_FILE"

printf '%s\n' "Installed cron job:"
printf '%s\n' "$CRON_LINE"
