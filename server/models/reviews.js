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

module.exports = {
  getDBReviews,
};
