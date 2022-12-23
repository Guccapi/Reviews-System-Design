const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const db = new Pool({
  host: 'localhost',
  user: 'elizabeth',
  pssword: 'Empireswillriseagain',
  port: 5432,
  database: 'GucciRR',
  allowExitOnIdle: true,
});

const characteristicsReview = [];

fs.createReadStream(path.join(__dirname, '../CSVS/reviews.csv'))
  .pipe(csv())
  .on('data', (data) => console.log(data))
  .on('end', () => {
    console.log(characteristicsReview);
  });
