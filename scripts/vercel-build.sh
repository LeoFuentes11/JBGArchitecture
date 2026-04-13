#!/bin/bash
set -e

echo "==> Running Payload migrations..."

# Use the direct (non-pooled) connection for DDL operations
export DATABASE_URL="${DATABASE_URL_UNPOOLED:-$DATABASE_URL}"

# Run migrations (applies any pending migration files)
npx payload migrate

echo "==> Building Next.js..."
# Restore runtime DATABASE_URL (pooled is fine for reads)
export DATABASE_URL="${DATABASE_URL_POOLED:-${ORIGINAL_DATABASE_URL:-$DATABASE_URL}}"

npx next build
