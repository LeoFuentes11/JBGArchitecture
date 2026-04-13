require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

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
  // Check env
  const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URI
  console.log('DB URL exists:', !!dbUrl)
  console.log('DB URL starts with:', dbUrl ? dbUrl.substring(0, 30) : 'none')
  
  if (!dbUrl) {
    console.error('No database URL found in environment!')
    process.exit(1)
  }
  
  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  })

  try {
    await client.connect()
    console.log('Connected to database')

    // Drop old tables
    const oldTables = ['users_sessions', 'users', 'blog-posts', 'blog_posts', 'media', 'projects', 'services', '_payload_migrations']
    for (const t of oldTables) {
      try { 
        await client.query(`DROP TABLE IF EXISTS "${t}" CASCADE`) 
        console.log('Dropped:', t)
      } catch (e) {
        // Ignore
      }
    }
    console.log('Dropped old tables')

    // Run new migration
    const sql = fs.readFileSync(path.join(__dirname, 'migrations', '20260413_init.sql'), 'utf8')
    const statements = parseSQL(sql)

    console.log('Running migration...')
    for (const stmt of statements) {
      if (!stmt) continue
      try {
        await client.query(stmt)
      } catch (err) {
        if (err.code !== '42P07' && err.code !== '42710') {
          console.log('Error:', err.code, stmt.substring(0, 30))
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
    console.error('Migration failed:', err.message)
    console.error(err.stack)
    process.exit(1)
  } finally {
    await client.end().catch(() => {})
  }
}

migrate()