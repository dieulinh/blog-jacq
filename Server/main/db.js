const { Pool } = require('pg')

const pool = new Pool({
  user: 'jaquelinecoelho',
  host: 'localhost',
  database: 'blog',
  password: '123',
  post: 5432
})

module.exports = pool
