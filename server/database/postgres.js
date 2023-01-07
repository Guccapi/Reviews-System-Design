require('dotenv').config();
const pgp = require('pg-promise')({});

const cn = {
  host: process.env.PGHOST,
  user: process.env.PG_USER,
  pssword: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const db = pgp(cn);

module.exports = db;
