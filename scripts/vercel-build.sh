#!/bin/bash

export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_OPTIONS="--unhandled-rejections=warn"

echo "==> Generating Payload types..."
npx payload generate:types || true

echo "==> Generating Payload import map..."
npx payload generate:importmap || true

echo "==> Running Payload migrations..."
POSTGRES_URL="${POSTGRES_URL_NON_POOLING:-$POSTGRES_URL}" npx payload migrate || true

echo "==> Building Next.js..."
npx next build
