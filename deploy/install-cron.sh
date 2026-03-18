#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/ai-radar"
LOG_FILE="/var/log/ai-radar-update.log"
CRON_EXPR="${CRON_EXPR:-5 9 * * *}"
CRON_LINE="$CRON_EXPR $APP_DIR/deploy/server-update.sh >> $LOG_FILE 2>&1"

mkdir -p "$APP_DIR"
touch "$LOG_FILE"

CURRENT_CRON="$(crontab -l 2>/dev/null || true)"

if printf '%s\n' "$CURRENT_CRON" | grep -Fq "$APP_DIR/deploy/server-update.sh"; then
  printf '%s\n' "Cron job already exists."
  exit 0
fi

{
  printf '%s\n' "$CURRENT_CRON"
  printf '%s\n' "$CRON_LINE"
} | crontab -

printf '%s\n' "Installed cron job:"
printf '%s\n' "$CRON_LINE"
