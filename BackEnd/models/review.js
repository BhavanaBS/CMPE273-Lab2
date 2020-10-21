const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  rest_id: { type: String, required: true },
  cust_id: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  review: { type: String, required: true },
  create_time: { type: String, required: true }, // create time
},
{
  versionKey: false,
});

module.exports = mongoose.model('review', reviewSchema);
