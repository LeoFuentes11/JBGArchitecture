require('dotenv').config({ path: '.env.local' })
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL_UNPOOLED,
  ssl: { rejectUnauthorized: false },
})

function parseSQL(sql) {
  // Remove SQL comments (-- and /* */)
  let cleaned = sql
    .replace(/--[^\n]*/g, '') // Remove line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
  
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
  const fs = require('fs')
  const path = require('path')
  
  const sql = fs.readFileSync(path.join(__dirname, 'migrations', '20260413_init.sql'), 'utf8')
  const statements = parseSQL(sql)

  console.log('Total statements:', statements.length)
  console.log('First 3:')
  statements.slice(0, 3).forEach((s, i) => console.log(i + ':', s.substring(0, 60)))
  console.log()

  try {
    await client.connect()

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i]
      
      try {
        await client.query(stmt)
        console.log(`✓ [${i + 1}/${statements.length}]:`, stmt.substring(0, 60).replace(/\s+/g, ' '))
      } catch (err) {
        console.log(`✗ [${i + 1}/${statements.length}] ${err.code}:`, stmt.substring(0, 50).replace(/\s+/g, ' '))
      }
    }

    // Verify
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    )
    console.log('\nTables in database:')
    if (result.rows.length === 0) {
      console.log('  (none)')
    } else {
      result.rows.forEach(r => console.log(' - ' + r.table_name))
    }
  } catch (err) {
    console.error('Failed:', err.message)
  } finally {
    await client.end()
  }
}

migrate()