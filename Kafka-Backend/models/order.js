const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  rest_id: { type: String, required: true },
  cust_id: { type: String, required: true },
  status: { type: String, required: true },
  create_time: { type: Date, default: Date.now() },
  delivery_method: { type: String, required: true },
  order_dishes: [{
    dish_id: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('order', orderSchema);
