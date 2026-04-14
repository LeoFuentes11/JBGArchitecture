#!/bin/bash

export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_OPTIONS="--unhandled-rejections=warn"

echo "==> Building Next.js..."
npx next build