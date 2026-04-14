#!/bin/bash
set -e

echo "==> Generating Payload import map..."
npx payload generate:importmap

echo "==> Running Payload migrations..."
DATABASE_URL="${DATABASE_URL_UNPOOLED:-$DATABASE_URL}" npx tsx node_modules/payload/bin.js migrate

echo "==> Building Next.js..."
npx next build
