import mongoose from 'mongoose';

const { Schema } = mongoose;

const URI = process.env.DB_URI || 'mongodb://localhost:27017/reviews';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  await mongoose.connect(URI, options);
  console.log('');
} catch (err) {
  console.error(err);
}

const reviewInfoSchema = new Schema({
  review_id: Number,
  rating: Number,
  summary: String,
  recommended: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: {
    id: Number,
    value: String,
  },
});

const metaDataSchema = new Schema({
    ratings: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
    },
    recommended: {
      true: Number,
      false: Number,
    },
    characteristics: {
      size: {
        id: Number,
        value: String,
      },
      width: {
        id: Number,
        value: String,
      },
      comfort {
        id: Number,
        value: String,
      },
      quality: {
        id: Number,
        value: String,
      },
      length: {
        id: Number,
        value: String,
      },
      fit: {
        id: Number,
        value: String,
      },
    }
  });

const productInfoSchema = new Schema({
  product_id: Number,
  review_info: reviewInfoSchema,
  metaData: metaDataSchema,
});

const ProductInfo = mongoose.model('ProductInfo', productInfoSchema);

module.export = ProductInfo;
