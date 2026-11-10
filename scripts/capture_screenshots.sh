#!/usr/bin/env bash
set -e

mkdir -p screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP_DIR=$(mktemp -d /tmp/chrome-ss-XXXXXX)

capture() {
  local url="$1"
  local output="$2"
  local delay="${3:-2}"
  echo "Capturing $url to $output (delay: ${delay}s)..."
  "$CHROME" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --user-data-dir="$TMP_DIR" \
    --window-size=1440,900 \
    --hide-scrollbars \
    --virtual-time-budget=4000 \
    --screenshot="$output" \
    "$url"
}

capture "http://localhost:3000/" "screenshots/01_homepage.png" 2
capture "http://localhost:3000/boardings" "screenshots/02_boardings_catalog.png" 2
capture "http://localhost:3000/boarding/temple-junction-space" "screenshots/03_property_details.png" 2
capture "http://localhost:3000/login" "screenshots/04_student_portal.png" 2
capture "http://localhost:3000/owner/login" "screenshots/05_host_portal.png" 2
capture "http://localhost:3000/admin" "screenshots/06_host_admin_dashboard.png" 2

rm -rf "$TMP_DIR"
echo "Screenshots generated successfully in screenshots/"
