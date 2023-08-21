const Pool = require('pg').Pool;

const pool = new Pool({
  user: '_',
  password: '_',
  host: 'localhost',
  port: 5432,
  database: '_'
});

module.exports = pool;