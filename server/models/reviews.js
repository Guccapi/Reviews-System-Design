/* eslint-disable camelcase */
const fns = require('date-fns');
const db = require('../database/postgres');

const getDBReviews = async ({ product_id, count, page }) => {
  try {
    const query = await db.query(
      `SELECT * FROM review WHERE product_id = ${product_id} AND reported = false LIMIT ${count || 5} OFFSET ${page * count - count || 0}`,
    );
    return Promise.resolve(query.sort((a, b) => b.helpfulness - a.helpfulness));
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const getDBMetaData = async ({ product_id }) => {
  try {
    const query = await db.query(
      `SELECT * FROM productmeta WHERE product_id = ${product_id}`,
    );
    return Promise.resolve(query.sort((a, b) => b.helpfulness - a.helpfulness));
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const postDBReview = async ({
  product_id, rating, summary, body, reported, reviewer_name, reviewer_email, response, photos,
}) => {
  const productId = Number(product_id);
  const ratingNum = Number(rating);
  const dateStr = fns.fromUnixTime(Date.now() / 1000).toISOString();
  const summaryStr = summary.replaceAll("'", "''");
  const bodyStr = body.replaceAll("'", "''");
  const reportedBool = Boolean(reported);
  const reviewerName = reviewer_name.replaceAll("'", "''");
  const reviewerEmail = reviewer_email.replaceAll("'", "''");
  const responseStr = response.replaceAll("'", "''");
  try {
    const query = await db.query(
      `INSERT INTO review(product_id, rating, date, summary, body, reported, reviewer_name, reviewer_email, response) VALUES (${productId}, ${ratingNum}, '${dateStr}','${summaryStr}','${bodyStr}',${reportedBool},'${reviewerName}','${reviewerEmail}','${responseStr}')`,
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
