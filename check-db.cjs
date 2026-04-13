require('dotenv').config({ path: '.env.local' })
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL_UNPOOLED,
  ssl: { rejectUnauthorized: false },
})

async function check() {
  try {
    await client.connect()
    
    // Check indexes
    const indexes = await client.query(
      "SELECT tablename, indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename IN ('users','users_sessions') ORDER BY tablename, indexname"
    )
    console.log('Indexes:')
    indexes.rows.forEach(r => console.log(r.tablename + ':' + r.indexname))
    
    // Check constraints
    const constraints = await client.query(
      "SELECT conname, contype, conrelid::regclass AS table FROM pg_constraint WHERE conrelid::regclass IN ('users','users_sessions') ORDER BY conrelid, contype"
    )
    console.log('\nConstraints:')
    constraints.rows.forEach(r => console.log(r.table + ':' + r.conname + ' (' + r.contype + ')'))
    
    // Test insert
    console.log('\nTesting insert...')
    try {
      await client.query(`
        INSERT INTO users (email, name, role, hash, salt) 
        VALUES ('test@test.com', 'Test', 'admin', '$$2b$$10$$test', 'testsalt')
      `)
      console.log('Inserted!')
      
      // Delete test
      await client.query("DELETE FROM users WHERE email = 'test@test.com'")
      console.log('Deleted test record')
    } catch (e) {
      console.log('Error:', e.message)
    }
    
  } finally {
    await client.end()
  }
}

check()