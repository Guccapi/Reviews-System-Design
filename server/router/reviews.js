const reviewsRouter = require('express').Router();
const {
  reviews: { getReviews, getMetaData, addReview, helpfulReview, reportReview },
  //  getMetaData, addReview, helpfulReview, reportReview,
} = require('../controllers');

reviewsRouter.get('/reviews', getReviews);

reviewsRouter.get('/reviews/meta', getMetaData);

reviewsRouter.post('/reviews', addReview);

reviewsRouter.put('/reviews/:review_id/helpful', helpfulReview);

reviewsRouter.put('/reviews/:review_id/report', reportReview);

module.exports = reviewsRouter;
