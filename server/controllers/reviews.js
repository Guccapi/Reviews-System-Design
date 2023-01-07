const {
  reviews: {
    getDBReviews,
    getDBMetaData,
    postDBReview,
    putHelpfulReview,
    putReportReview,
  },
} = require('../models');

// reviewsRouter.put('/reviews/:review_id/helpful', helpfulReview);

// reviewsRouter.put('/reviews/:review_id/report', reportReview);

const getReviews = async (req, res) => {
  try {
    const reviews = await getDBReviews(req.query);
    res.send(reviews);
  } catch (err) {
    console.error(err);
    res.send(err).status(400);
  }
};

const getMetaData = async (req, res) => {
  try {
    const metaData = await getDBMetaData(req.query);
    res.send(metaData);
  } catch (err) {
    console.error(err);
    res.send(err).status(400);
  }
};

const addReview = async (req, res) => {
  try {
    console.log('Da Body: ', req.body);
    await postDBReview(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

const helpfulReview = async (req, res) => {
  try {
    const reviewId = req.params.review_id;
    await putHelpfulReview(reviewId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const reportReview = async (req, res) => {
  try {
    await putReportReview(req.params.review_id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

module.exports = {
  getReviews,
  getMetaData,
  addReview,
  helpfulReview,
  reportReview,
};
