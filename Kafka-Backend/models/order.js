const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  rest_id: { type: String, required: true },
  customer: [{
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
  status: { type: String, required: true },
  create_time: { type: Date, default: Date.now() },
  delivery_method: { type: String, required: true },
  order_dishes: [{
    dish_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('order', orderSchema);
