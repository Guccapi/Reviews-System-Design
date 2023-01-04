require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { reviewsRouter } = require('./router');

const corsOptions = {
  origin: 'http://localhost/',
  methods: ['GET', 'POST', 'PUT'],
  maxAge: '3600',
};

const app = express();
const PORT = process.env.PORT || 8080;

reviewsRouter.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(reviewsRouter);
app.use(morgan('dev'));

app.set('port', PORT);

module.exports = app;
