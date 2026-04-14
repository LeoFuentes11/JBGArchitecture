#!/bin/bash
set -e

echo "==> Running Payload migrations..."
DATABASE_URL="${DATABASE_URL_UNPOOLED:-$DATABASE_URL}" npx tsx node_modules/payload/bin.js migrate

echo "==> Building Next.js..."
npx next build
