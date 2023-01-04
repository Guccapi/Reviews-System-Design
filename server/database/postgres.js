require('dotenv').config();
const pgp = require('pg-promise')({});

const cn = {
  host: 'localhost',
  user: process.env.PG_USER,
  pssword: process.env.PG_PASSWORD,
  port: 5432,
  database: process.env.PG_DATABASE,
};

const db = pgp(cn);

module.exports = db;
