/* eslint-disable camelcase */
const fns = require('date-fns');
const db = require('../database/postgres');

const getDBReviews = async ({ product_id, count, page }) => {
  try {
    const query = await db.query(
      `SELECT * FROM review WHERE product_id = ${product_id} AND reported = false LIMIT ${
        count || 5
      } OFFSET ${page * count - count || 0}`,
    );
    return Promise.resolve(query.sort((a, b) => b.helpfulness - a.helpfulness));
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const getDBMetaData = async ({ product_id }) => {
  const data = {};
  try {
    const query = await db.query(
      `SELECT * FROM productmeta WHERE product_id = ${product_id}`,
    );
    data.meta = query.sort((a, b) => b.helpfulness - a.helpfulness);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  } try {
    const query2 = await db.query(
      `SELECT characteristic_name, value FROM characteristic WHERE id = ${product_id}`,
    );
    data.characteristics = query2;
    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

//select characteristic_name, value from characteristic where product_id = 3 select * from productmeta where product_id = 3;

const postDBReview = async ({
  product_id,
  rating,
  summary,
  body,
  reported,
  reviewer_name,
  reviewer_email,
  response,
  photos,
}) => {
  const postData = [
    Number(product_id),
    Number(rating),
    fns.fromUnixTime(Date.now() / 1000).toISOString(),
    summary,
    body,
    Boolean(reported),
    reviewer_name,
    reviewer_email,
    response,
  ];
  try {
    const query = await db.query(
      'INSERT INTO review(product_id, rating, date, summary, body, reported, reviewer_name, reviewer_email, response) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [postData],
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putHelpfulReview = async (reviewId) => {
  try {
    const query = await db.query(
      `UPDATE review SET helpfulness = helpfulness + 1 WHERE review_id = ${reviewId}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putReportReview = async (reviewId) => {
  try {
    const query = await db.query(
      `UPDATE review SET reported = true WHERE review_id = ${reviewId}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports = {
  getDBReviews,
  getDBMetaData,
  postDBReview,
  putHelpfulReview,
  putReportReview,
};
