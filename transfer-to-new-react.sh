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

# 1) Copy public assets (images, CSS, legacy scripts) without removing defaults
mkdir -p "${DEST_APP}/public"
cp -r "${SRC_APP}/public/"* "${DEST_APP}/public/" 2>/dev/null || true

# 2) Patch destination index.html HEAD with our preload and styles (preserve defaults)
IDX_HTML="${DEST_APP}/index.html"

insert_if_missing() {
  local needle="$1"
  local line_to_insert="$2"
  local file="$3"
  if ! grep -qF "$needle" "$file"; then
    # Insert before </head>
    sed -i "s#</head>#  ${line_to_insert}
</head>#" "$file"
  fi
}

insert_if_missing 'href="/climate.jpg"' '<link rel="preload" as="image" href="/climate.jpg">' "$IDX_HTML"
insert_if_missing 'href="/style.css"' '<link rel="stylesheet" href="/style.css">' "$IDX_HTML"
insert_if_missing 'href="/hero-theme.css"' '<link rel="stylesheet" href="/hero-theme.css">' "$IDX_HTML"
insert_if_missing "unpkg.com/boxicons" "<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>" "$IDX_HTML"

# 3) Copy React source that wires the page and legacy scripts
TS_TARGET=0
if [[ -f "${DEST_APP}/tsconfig.json" || -f "${DEST_APP}/src/main.tsx" ]]; then
  TS_TARGET=1
fi

if [[ "$TS_TARGET" -eq 1 ]]; then
  # TypeScript target: copy and rename .jsx -> .tsx
  cp "${SRC_APP}/src/App.jsx" "${DEST_APP}/src/App.tsx"
  # main.tsx requires import path fix
  sed 's#\.\/App\.jsx#./App.tsx#g' "${SRC_APP}/src/main.jsx" > "${DEST_APP}/src/main.tsx"
  # Add global.d.ts for window flag to appease TS
  cat > "${DEST_APP}/src/global.d.ts" <<'EOF'
declare global {
  interface Window {
    __legacyScriptsLoaded?: boolean;
  }
}
export {};
EOF
else
  # JavaScript target: copy as-is
  cp "${SRC_APP}/src/App.jsx" "${DEST_APP}/src/App.jsx"
  cp "${SRC_APP}/src/main.jsx" "${DEST_APP}/src/main.jsx"
fi

echo "Migration complete -> ${DEST_APP}"
if [[ "$TS_TARGET" -eq 1 ]]; then
  echo "Detected TypeScript app. Wrote src/App.tsx, src/main.tsx, and src/global.d.ts"
else
  echo "Detected JavaScript app. Wrote src/App.jsx and src/main.jsx"
fi

echo "Next:"
echo "  cd ${DEST_APP} && npm install && npm run dev"