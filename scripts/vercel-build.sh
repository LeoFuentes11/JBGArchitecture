#!/bin/bash
set -e

echo "==> Generating Payload types..."
NODE_OPTIONS="--import tsx" npx payload generate:types --disable-transpile

echo "==> Generating Payload import map..."
NODE_OPTIONS="--import tsx" npx payload generate:importmap --disable-transpile

echo "==> Running Payload migrations..."
DATABASE_URL="${DATABASE_URL_UNPOOLED:-$DATABASE_URL}" NODE_OPTIONS="--import tsx" npx payload migrate --disable-transpile

echo "==> Building Next.js..."
npx next build
