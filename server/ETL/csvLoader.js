const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const fns = require('date-fns');
const pgp = require('pg-promise')({});

const cn = {
  host: 'localhost',
  user: 'elizabeth',
  pssword: 'Empireswillriseagain',
  port: 5432,
  database: 'GucciRR',
};

const db = pgp(cn);
const reviews = [];
const reviewColumns = new pgp.helpers.ColumnSet(
  [
    'review_id',
    'product_id',
    'rating',
    'date',
    'summary',
    'body',
    'recommend',
    'reported',
    'reviewer_name',
    'reviewer_email',
    'response',
    'helpfulness',
    // 'photos',
  ],
  { table: 'review' },
);

const queryReview = async (query1, query2, query3, query4) => {
  try {
    await db.any(query1);
  } catch (err) {
    console.error(err);
  } try {
    await db.any(query2);
  } catch (err) {
    console.error(err);
  } try {
    await db.any(query3);
  } catch (err) {
    console.error(err);
  } finally {
    await db.any(query4);
  }
};

fs.createReadStream(path.join(__dirname, '../CSVS/reviews.csv'))
  .pipe(csv())
  .on('data', async (data) => {
    const review_id = Number(data.id);
    const product_id = Number(data.product_id);
    const rating = Number(data.rating);
    const date = fns.fromUnixTime(data.date / 1000).toISOString();
    const summary = data.summary.replaceAll("'", "''");
    const body = data.body.replaceAll("'", "''");
    const { recommend } = data;
    const { reported } = data;
    const reviewer_name = data.reviewer_name.replaceAll("'", "''");
    const reviewer_email = data.reviewer_email.replaceAll("'", "''");
    const response = data.response.replaceAll("'", "''");
    const helpfulness = Number(data.helpfulness);
    reviews.push({
      review_id,
      product_id,
      rating,
      date,
      summary,
      body,
      recommend,
      reported,
      reviewer_name,
      reviewer_email,
      response,
      helpfulness,
    });
  })
  .on('end', () => {
    const insertion1 = pgp.helpers.insert(reviews.slice(0, reviews.length / 4), reviewColumns);
    const insertion2 = pgp.helpers.insert(
      reviews.slice(reviews.length / 4, (reviews.length / 2)),
      reviewColumns,
    );
    const insertion3 = pgp.helpers.insert(
      reviews.slice(reviews.length / 2, ((reviews.length / 4) * 3)),
      reviewColumns,
    );
    const insertion4 = pgp.helpers.insert(reviews.slice(-(reviews.length / 4)), reviewColumns);

    const t0 = performance.now();
    queryReview(insertion1, insertion2, insertion3, insertion4);
    const t1 = performance.now();
    console.log(`Reviews took ${t1 - t0} milliseconds to complete!`);
  })
  .on('error', (err) => {
    console.error(err);
  });

// const characteristicsArray = [];
// const characteristicsColumns = new pgp.helpers.ColumnSet(
//   [
//     'product_id',
//     // 'ratings',
//     // 'recommended',
//     // 'characteristics',
//   ],
//   { table: 'productMeta' },
// );

// fs.createReadStream(path.join(__dirname, '../CSVS/characteristics.csv'))
//   .pipe(csv())
//   .on('data', async (data) => {
//     const characteristicId = Number(data.id);
//     const characteristicName = data.name.replaceAll("'", "''");
//     const productId = Number(data.product_id);
//     characteristicsArray.push(productId);
//   })
//   .on('end', () => {
//     const insertion = pgp.helpers.insert(characteristicsArray, characteristicsColumns);
//     const t0 = performance.now();
//     db.none(insertion);
//     const t1 = performance.now();
//     console.log(`Characteristics took ${t1 - t0} milliseconds to complete`);
//   })
//   .on('error', (err) => {
//     console.error(err);
//   });
