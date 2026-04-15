#!/usr/bin/env bash
# Launcher for Socials MCP.
# - Default: published package via `npx -y @brainrotcreations/socials`
# - Dev mode: local build at socials/mcp/dist/index.cjs
set -euo pipefail

ROOT="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
DEV_MODE="${SOCIALS_MCP_DEV_MODE:-0}"

if [[ "$DEV_MODE" == "1" || "$DEV_MODE" == "true" || "$DEV_MODE" == "TRUE" ]]; then
  LOCAL_ENTRY_DEFAULT="$ROOT/../../../socials/mcp/dist/index.cjs"
  LOCAL_ENTRY="${SOCIALS_MCP_DEV_MCP_PATH:-$LOCAL_ENTRY_DEFAULT}"

  if [[ ! -f "$LOCAL_ENTRY" ]]; then
    echo "[socials] Dev mode enabled but local MCP entry not found: $LOCAL_ENTRY" >&2
    echo "[socials] Build it first: cd \"$ROOT/../../../socials/mcp\" && npm run build" >&2
    exit 1
  fi

  exec node "$LOCAL_ENTRY"
fi

exec npx -y @brainrotcreations/socials
