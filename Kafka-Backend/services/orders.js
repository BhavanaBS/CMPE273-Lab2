// rest - get orders, modify orders
// cust - create order, get orders

const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);
  if (msg.path === 'rest_orders_put') {
    console.log('Entered rest_orders_put');
  } else if (msg.path === 'rest_orders_get') {
    console.log('Entered rest_orders_get');
  } else if (msg.path === 'cust_orders_post') {
    console.log('Entered cust_orders_post');
  } else if (msg.path === 'cust_orders_get') {
    console.log('Entered cust_orders_get');
  }
};

exports.handle_request = handle_request;