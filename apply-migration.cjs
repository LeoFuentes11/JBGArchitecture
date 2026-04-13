require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL_UNPOOLED,
  ssl: { rejectUnauthorized: false },
})

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
  try {
    await client.connect()
    console.log('Connected to database')

    // Drop old tables (ignore errors if they don't exist)
    const oldTables = ['users_sessions', 'users', 'blog-posts', 'blog_posts', 'media', 'projects', 'services', '_payload_migrations']
    for (const t of oldTables) {
      try { await client.query(`DROP TABLE IF EXISTS "${t}" CASCADE`) } catch {}
    }
    console.log('Dropped old tables')

    // Read and run new migration
    const sql = fs.readFileSync(path.join(__dirname, 'migrations', '20260413_init.sql'), 'utf8')
    const statements = parseSQL(sql)

    console.log('Running migration...')
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i]
      if (!stmt) continue
      try {
        await client.query(stmt)
      } catch (err) {
        if (err.code !== '42P07' && err.code !== '42710') {
          console.log(`Error ${err.code}:`, stmt.substring(0, 40))
        }
      }
    }

    // Verify
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    )
    console.log('\nTables created:')
    result.rows.forEach(r => console.log(' -', r.table_name))
    console.log('\n✓ Migration complete!')
  } catch (err) {
    console.error('Failed:', err.message)
  } finally {
    await client.end()
  }
}

migrate()