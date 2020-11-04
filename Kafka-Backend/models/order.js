const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  restaurant_id: { type: Schema.ObjectId, ref: 'rest_profile' },
  customer_id: { type: Schema.ObjectId, ref: 'cust_profile' },
  status: { type: String, required: true },
  create_time: { type: Date, default: Date.now() },
  delivery_method: { type: String, required: true },
  // order_dishes: [{ type: Schema.rest_dishes.ObjectId, ref: 'rest_profile'}],
},
{
  versionKey: false,
});

module.exports = mongoose.model('order', orderSchema);
