const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const reviewInfo = [];

fs.createReadStream(path.join(__dirname, '../CSVS/questions.csv'))
  .pipe(csv())
  .on('data', (data) => reviewInfo.push(data))
  .on('end', () => {
    console.log(reviewInfo);
  });
