#!/usr/bin/env bash
set -e

mkdir -p screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP_DIR=$(mktemp -d /tmp/chrome-ss-XXXXXX)

capture() {
  local url="$1"
  local output="$2"
  local size="${3:-1440,900}"
  echo "Capturing $url to $output (size: $size)..."
  "$CHROME" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --user-data-dir="$TMP_DIR" \
    --window-size="$size" \
    --hide-scrollbars \
    --virtual-time-budget=5000 \
    --screenshot="$output" \
    "$url"
}

# 1. Full Homepage and Viewport Homepage
capture "http://localhost:3000/" "screenshots/01_homepage_full.png" "1440,3800"
capture "http://localhost:3000/" "screenshots/01_homepage.png" "1440,900"

# 2. Boardings Catalog & Details
capture "http://localhost:3000/boardings" "screenshots/02_boardings_catalog.png" "1440,1200"
capture "http://localhost:3000/boarding/temple-junction-space" "screenshots/03_property_details.png" "1440,1200"

# 3. Portals & Dashboard
capture "http://localhost:3000/login" "screenshots/04_student_portal.png" "1440,900"
capture "http://localhost:3000/owner/login" "screenshots/05_host_portal.png" "1440,900"
capture "http://localhost:3000/admin" "screenshots/06_host_admin_dashboard.png" "1440,1100"

# 4. Activities, About, and Contact Pages
capture "http://localhost:3000/activities" "screenshots/07_activities_page.png" "1440,2400"
capture "http://localhost:3000/about" "screenshots/08_about_page.png" "1440,2200"
capture "http://localhost:3000/contact" "screenshots/09_contact_page.png" "1440,1400"

rm -rf "$TMP_DIR"
echo "Screenshots generated successfully in screenshots/"
