#!/usr/bin/env bash
set -euo pipefail

SRC_APP="/workspace/react-app"
DEST_APP="${1:-}"

if [[ -z "${DEST_APP}" ]]; then
  echo "Usage: $0 /absolute/path/to/new-react-app"
  exit 1
fi

if [[ ! -d "${DEST_APP}" ]]; then
  echo "Destination does not exist: ${DEST_APP}"
  exit 1
fi

if [[ ! -d "${DEST_APP}/public" || ! -d "${DEST_APP}/src" ]]; then
  echo "Destination is not a valid Vite React app (missing public/ or src/): ${DEST_APP}"
  exit 1
fi

# Copy public assets (images, CSS, legacy scripts)
mkdir -p "${DEST_APP}/public"
cp -r "${SRC_APP}/public/"* "${DEST_APP}/public/" 2>/dev/null || true

# Overwrite index.html to include our links and preload
cp "${SRC_APP}/index.html" "${DEST_APP}/index.html"

# Copy React source that wires the page and legacy scripts
cp "${SRC_APP}/src/App.jsx" "${DEST_APP}/src/App.jsx"
cp "${SRC_APP}/src/main.jsx" "${DEST_APP}/src/main.jsx"

# Ensure CSS import exists (project already has index.css)
# No-op if already present

echo "Migration complete -> ${DEST_APP}"
echo "Next:"
echo "  cd ${DEST_APP} && npm install && npm run dev"