// rest - add dish, view dish, edit dish, delete dish, add image, get image, get a perticular dish

const Restaurant = require('../models/rest_profile');
const Dish = require('../models/rest_dish');

// const restDishSchema = new Schema({
//   restaurant_id ,
//   name ,
//   ingredients ,
//   price ,
//   category ,
//   description ,
//   dish_image ,
// },

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);
  if (msg.path === 'dish_post') {
    console.log('Entered dish_post');

  } else if (msg.path === 'dish_get_all') {
    console.log('Entered dish_get_all');
  } else if (msg.path === 'dish_get') {
    console.log('Entered dish_get');
  } else if (msg.path === 'dish_put') {
    console.log('Entered dish_put');
  } else if (msg.path === 'dish_delete') {
    console.log('Entered dish_delete');
  }
};

exports.handle_request = handle_request;