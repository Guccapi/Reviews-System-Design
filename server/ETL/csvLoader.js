/* eslint-disable camelcase */
require('dotenv').config();
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const fns = require('date-fns');
const pgp = require('pg-promise')({});
// const db = require('../database/postgres');
const cn = {
  host: 'localhost',
  user: 'elizabeth',
  pssword: 'Empireswillriseagain',
  port: 5432,
  database: 'GucciRR',
};

const db = pgp(cn);

const seedReview = () => {
  const reviews = [];
  // const reviewsObj = {};
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
  // const metaDataColumns = new pgp.helpers.ColumnSet(
  //   [
  //     'product_id',
  //     'ratings',
  //     'recommend',
  //   ],
  //   { table: 'metadata' },
  // );

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
      // if (reviewsObj[product_id] === undefined) {
      //   reviewsObj[product_id] = {
      //     'product_id': product_id,
      //     ratings: {
      //       1: 0,
      //       2: 0,
      //       3: 0,
      //       4: 0,
      //       5: 0,
      //     },
      //     recommend: {
      //       true: 0,
      //       false: 0,
      //     },
      //     charcount: 0,
      //   };
      // } else {
      //   reviewsObj[product_id].ratings[rating] += 1;
      //   reviewsObj[product_id].recommend[recommend] += 1;
      //   reviewsObj[product_id].charcount += 1;
      // }
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

    // const insertion = pgp.helpers.insert(reviewsObj, metaDataColumns);
    // const t3 = performance.now();
    // db.none(insertion);
    // const t4 = performance.now();
    // console.log(`Characteristics took ${t4 - t3} milliseconds to complete`);
    })
    .on('error', (err) => {
      console.error(err);
    });
};

const initialCharacterSeeding = () => {
  const characteristicsArray = [];
  const characteristicsColumns = new pgp.helpers.ColumnSet(
    [
      'id',
      'characteristic_name',
      'product_id',
    ],
    { table: 'characteristic' },
  );

  fs.createReadStream(path.join(__dirname, '../CSVS/characteristics.csv'))
    .pipe(csv())
    .on('data', async (data) => {
    // console.log('Data: ', data);
      const characteristicId = Number(data.id);
      const characteristicName = data.name.replaceAll("'", "''");
      const productId = Number(data.product_id);
      // console.log('Product Id: ', productId);
      characteristicsArray.push({
        id: characteristicId,
        characteristic_name: characteristicName,
        product_id: productId,
      });
    })
    .on('end', () => {
      const insertion = pgp.helpers.insert(characteristicsArray, characteristicsColumns);
      const t0 = performance.now();
      db.none(insertion);
      const t1 = performance.now();
      console.log(`Characteristics took ${t1 - t0} milliseconds to complete`);
    })
    .on('error', (err) => {
      console.error(err);
    });
};

const characteristicValueUpdate = () => {
  const characteristicReviewArray = [];

  const characteristicRerviewColumns = new pgp.helpers.ColumnSet(
    [
      '?id',
      'value',
    ],
    { table: 'characteristic' },
  );
  fs.createReadStream(path.join(__dirname, '../CSVS/characteristic_reviews.csv'))
    .pipe(csv())
    .on('data', async (data) => {
      const characteristicValue = Number(data.value);
      const characteristicId = Number(data.characteristic_id);
      characteristicReviewArray.push({
        id: characteristicId,
        value: characteristicValue,
      });
    })
    .on('end', async () => {
      const reducedArray = await characteristicReviewArray.reduce((accumulator, review) => {
        for (let i = 0; i <= accumulator.length; i++) {
          if (i === accumulator.length) {
            accumulator.push({ id: review.id, value: review.value });
            break;
          }
          if (accumulator[i]?.id === review?.id) {
            accumulator[i].value += review.value;
            break;
          }
        }
        return accumulator;
      }, []);
      const { length } = reducedArray;
      // const insertion = pgp.helpers.insert(characteristicReviewArray, characteristicRerviewColumns);
      // const t0 = performance.now();
      // db.none(insertion);
      // const t1 = performance.now();
      // console.log(`CharacteristicsReviews took ${t1 - t0} milliseconds to complete`);
      // async function valueUpdate(initial, ending) {
      //   db.tx((t) => {
      //     const queries = characteristicReviewArray
      //       .slice(initial, ending)
      //       .map((id) => t.any(
      //         `UPDATE characteristic SET value = value + ${id.value} WHERE id = ${id.id}`,
      //       ));
      //     return t.batch(queries);
      //   })
      //     .then(() => console.log('Success!'))
      //     .catch((err) => console.error(err));
      // }

      // const updateValue = async (query1, query2, query3, query4, query5, query6, query7, query8) => {
      //   try {
      //     await valueUpdate(query1, query2);
      //   } catch (err) {
      //     console.error(err);
      //   } try {
      //     await valueUpdate(query3, query4);
      //   } catch (err) {
      //     console.error(err);
      //   } try {
      //     await valueUpdate(query5, query6);
      //   } catch (err) {
      //     console.error(err);
      //   } finally {
      //     await valueUpdate(query7, query8);
      //   }
      // };
      // updateValue(0, characteristicReviewArray.length / 4, characteristicReviewArray.length / 4, characteristicReviewArray.length / 2, characteristicReviewArray.length / 2, -characteristicReviewArray.length / 4, ((characteristicReviewArray.length / 4) * 3), characteristicReviewArray.length);
      const insertion1 = `${pgp.helpers.update(reducedArray.slice(0, length / 4), characteristicRerviewColumns)} WHERE v.id = t.id`;
      const insertion2 = `${pgp.helpers.update(reducedArray.slice(length / 4, length / 2), characteristicRerviewColumns)} WHERE v.id = t.id`;
      const insertion3 = `${pgp.helpers.update(reducedArray.slice(length / 2, -length / 4), characteristicRerviewColumns)} WHERE v.id = t.id`;
      const insertion4 = `${pgp.helpers.update(reducedArray.slice(-length / 4), characteristicRerviewColumns)} WHERE v.id = t.id`;

      const t0 = performance.now();
      queryReview(insertion1, insertion2, insertion3, insertion4);
      const t1 = performance.now();
      console.log(`Reviews took ${t1 - t0} milliseconds to complete!`);
    })
    .on('error', (err) => {
      console.error(err);
    });
};
