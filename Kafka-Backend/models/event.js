const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  rest_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  hashtags: { type: String, required: true },
  participants: [{
    cust_id: { type: String, default: null },
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('event', eventSchema);
