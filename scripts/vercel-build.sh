#!/bin/bash

export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_OPTIONS="--import tsx --unhandled-rejections=warn"

echo "==> Generating Payload types..."
npx payload generate:types --disable-transpile || true

echo "==> Generating Payload import map..."
npx payload generate:importmap --disable-transpile || true

echo "==> Running Payload migrations..."
DATABASE_URL="${DATABASE_URL_UNPOOLED:-$DATABASE_URL}" npx payload migrate --disable-transpile || true

echo "==> Building Next.js..."
npx next build
