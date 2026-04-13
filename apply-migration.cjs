// Migration script - works on both local and Vercel
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

// Load dotenv only if .env.local exists (for local dev)
try {
  require('dotenv').config({ path: '.env.local' })
} catch {}

function parseSQL(sql) {
  let cleaned = sql.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
  const statements = []
  let current = ''
  let inQuote = false
  let quoteChar = ''
  
  for (const char of cleaned) {
    if ((char === "'" || char === '"') && !inQuote) {
      current += char
      inQuote = true
      quoteChar = char
    } else if (char === quoteChar && inQuote) {
      current += char
      inQuote = false
      quoteChar = ''
    } else if (char === ';' && !inQuote) {
      const stmt = current.trim()
      if (stmt) statements.push(stmt)
      current = ''
    } else {
      current += char
    }
  }
  const stmt = current.trim()
  if (stmt) statements.push(stmt)
  return statements
}

async function migrate() {
  // Use various env var names - Vercel sets these directly
  const dbUrl = process.env.DATABASE_URL_UNPOOLED || 
                process.env.POSTGRES_URL_NON_POOLING || 
                process.env.DATABASE_URL || 
                process.env.POSTGRES_URL || 
                process.env.DATABASE_URI
  
  console.log('[Migrate] DB URL exists:', !!dbUrl)
  console.log('[Migrate] DB URL:', dbUrl ? dbUrl.replace(/:([^@]+)@/, ':***@').substring(0, 50) + '...' : 'NONE')
  
  if (!dbUrl) {
    console.error('[Migrate] ERROR: No database URL! Set DATABASE_URL_UNPOOLED in Vercel.')
    process.exit(1)
  }
  
  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  })

  try {
    await client.connect()
    console.log('[Migrate] Connected to database')

    // Run migration (CREATE IF NOT EXISTS - safe to run multiple times)
    const sql = fs.readFileSync(path.join(__dirname, 'migrations', '20260413_init.sql'), 'utf8')
    const statements = parseSQL(sql)

    console.log('[Migrate] Running', statements.length, 'statements...')
    for (const stmt of statements) {
      if (!stmt) continue
      try {
        await client.query(stmt)
      } catch (err) {
        if (err.code !== '42P07' && err.code !== '42710') {
          console.log('[Migrate] Error:', err.code, stmt.substring(0, 30))
        }
      }
    }

    // Verify
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    )
    console.log('[Migrate] Tables created:', result.rows.map(r => r.table_name).join(', '))
    console.log('[Migrate] ✓ Complete!')
    
  } catch (err) {
    console.error('[Migrate] FAILED:', err.message)
    process.exit(1)
  } finally {
    await client.end().catch(() => {})
  }
}

migrate()