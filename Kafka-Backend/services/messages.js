// post : for that restaurant, for that user, post a Message
// post : for that customer, for that restaurant, post a Message

// cust get : get all messages from all restaurants for that customer
// rest get : get all messages from that customer for that restaurant

const Messages = require('../models/order');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);
  if (msg.path === 'cust_orders_post') {
    console.log('Entered cust_orders_post');
  } else if (msg.path === 'rest_orders_get') {
    console.log('Entered rest_orders_get');
  } else if (msg.path === 'rest_orders_put') {
    console.log('Entered rest_orders_put');
  } else if (msg.path === 'cust_orders_get') {
    console.log('Entered cust_orders_get');
  }
};

exports.handle_request = handle_request;