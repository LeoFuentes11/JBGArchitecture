/**
 * Patches payload's dist/bin/loadEnv.js to fix a CJS/ESM interop bug
 * where @next/env is imported as a default import but only has named exports.
 * This affects Node.js 22+ with tsx's tsImport API.
 */
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../node_modules/payload/dist/bin/loadEnv.js')

if (!fs.existsSync(filePath)) {
  console.log('patch-payload: loadEnv.js not found, skipping')
  process.exit(0)
}

let content = fs.readFileSync(filePath, 'utf8')

const broken = "import nextEnvImport from '@next/env';"
const fixed = "import { createRequire } from 'module';\nconst { loadEnvConfig: _loadEnvConfig } = createRequire(import.meta.url)('@next/env');"
const destructure = "const { loadEnvConfig } = nextEnvImport;"
const destructureFixed = "const loadEnvConfig = _loadEnvConfig;"

if (content.includes(broken)) {
  content = content.replace(broken, fixed)
  content = content.replace(destructure, destructureFixed)
  fs.writeFileSync(filePath, content)
  console.log('patch-payload: patched loadEnv.js successfully')
} else if (content.includes('createRequire')) {
  console.log('patch-payload: already patched, skipping')
} else {
  console.log('patch-payload: unexpected file contents, skipping')
}
