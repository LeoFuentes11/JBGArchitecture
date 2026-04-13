require('dotenv').config({ path: '.env.local' })
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL_UNPOOLED,
  ssl: { rejectUnauthorized: false },
})

async function check() {
  try {
    await client.connect()
    
    // Check users table columns
    const users = await client.query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position"
    )
    console.log('Users columns:')
    users.rows.forEach(r => console.log(' -', r.column_name, r.data_type, r.is_nullable))
    
    // Check users_sessions table columns
    const sessions = await client.query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'users_sessions' ORDER BY ordinal_position"
    )
    console.log('\nUsers_sessions columns:')
    sessions.rows.forEach(r => console.log(' -', r.column_name, r.data_type, r.is_nullable))
    
  } finally {
    await client.end()
  }
}

check()