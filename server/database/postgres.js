require('dotenv').config();
const pgp = require('pg-promise')({});

const cn = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  pssword: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

const db = pgp(cn);

module.exports = db;
