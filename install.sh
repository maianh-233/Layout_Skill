#!/usr/bin/env sh
# Cài skill layout-builder (+ design-taste-frontend) vào Claude Code (macOS / Linux / Git Bash).
set -e
here="$(cd "$(dirname "$0")" && pwd)"
dest="$HOME/.claude/skills"
mkdir -p "$dest"
for name in layout-builder design-taste-frontend; do
  keep=""
  [ -f "$dest/$name/.env" ] && keep="$(cat "$dest/$name/.env")"
  rm -rf "$dest/$name"
  cp -R "$here/$name" "$dest/$name"
  [ -n "$keep" ] && printf '%s' "$keep" > "$dest/$name/.env"
  echo "Đã cài: $dest/$name"
done
command -v node >/dev/null 2>&1 && echo "Node: $(node --version)" || echo "CẢNH BÁO: chưa có Node.js (cần ≥ 18) — https://nodejs.org"
echo 'Xong. Mở Claude Code và gõ: /layout-builder <mô tả website>'
