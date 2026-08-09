#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
YT_SRC="${YT_SRC:-/tmp/yt_casestudy}"
TARA_SRC="${TARA_SRC:-/tmp/hr-coworker/frontend}"

if [[ ! -d "$YT_SRC" ]]; then
  echo "Clone yt_casestudy to $YT_SRC first"
  exit 1
fi
if [[ ! -d "$TARA_SRC" ]]; then
  echo "Clone hr-coworker frontend to $TARA_SRC first"
  exit 1
fi

# YouTube case study — base path + router basename (patch if missing)
grep -q "base: '/demos/yt/'" "$YT_SRC/vite.config.ts" || \
  sed -i "s/plugins: \[react()\]/base: '\\/demos\\/yt\\/',\n  plugins: [react()]/" "$YT_SRC/vite.config.ts"
grep -q "import.meta.env.BASE_URL" "$YT_SRC/src/App.tsx" || \
  sed -i 's/<BrowserRouter>/<BrowserRouter basename={import.meta.env.BASE_URL.replace(\/\\\/$\/, "") || "\/"}>/' "$YT_SRC/src/App.tsx"

(cd "$YT_SRC" && npm ci && npm run build)
rm -rf "$ROOT/public/demos/yt"
mkdir -p "$ROOT/public/demos"
cp -r "$YT_SRC/dist" "$ROOT/public/demos/yt"

grep -q 'base: "/demos/tara/"' "$TARA_SRC/vite.config.ts" || \
  sed -i 's/plugins: \[react()\]/base: "\/demos\/tara\/",\n  plugins: [react()]/' "$TARA_SRC/vite.config.ts"

(cd "$TARA_SRC" && npm ci && npm run build)
rm -rf "$ROOT/public/demos/tara"
cp -r "$TARA_SRC/dist" "$ROOT/public/demos/tara"

echo "Demos built to public/demos/{yt,tara}"
