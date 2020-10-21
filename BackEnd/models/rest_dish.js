const mongoose = require('mongoose');

const { Schema } = mongoose;

const restDishSchema = new Schema({
  rest_id: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  dish_image: [{
    image_uri: { type: String, default: null },
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('rest_dish', restDishSchema);
