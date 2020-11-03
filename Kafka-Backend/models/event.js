const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  restaurant_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  hashtags: { type: String, required: true },
  participants: [{
    customer_id: { type: String, default: null },
    profile_picture: { type: String, default: null },
    dob: { type: String, default: null },
    address: { type: String, default: null },
    nick_name: { type: String, default: null },
    phone: { type: String, default: null },
    about: { type: String, default: null },
    join_date: { type: String, default: null },
    favourite_restaurant: { type: String, default: null },
    favourite_hobby: { type: String, default: null },
    blog_url: { type: String, default: null },
    email_id: { type: String, default: null },
    name: { type: String, default: null },
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('event', eventSchema);
