const mongoose = require('mongoose');

const { Schema } = mongoose;

const restDishSchema = new Schema({
  restaurant_id: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  dish_image: [{ type: String }],
},
{
  versionKey: false,
});

module.exports = restDishSchema;
