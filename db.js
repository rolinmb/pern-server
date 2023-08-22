const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '22721937',
  host: 'localhost',
  port: 5432,
  database: 'pernapp'
});

module.exports = pool;