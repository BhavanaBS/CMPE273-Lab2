const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
  var res = {};
  console.log('Kafka message path for Upload Image',msg.path);
  if (msg.path === "cust_image") {
    console.log('Inside Customer Image Upload POST method');
    Customer.findById(msg.customer_id, (err, customer) => {
      if (err) {
        console.log('Customer Image Upload Error');
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      }
      if (customer) {
        customer.profile_picture = msg.filename;
        customer.save((err, imageUploaded) => {
          if (err) {
            res.status = 500;
            res.message = 'UPLOAD_IMAGE_ERROR';
            console.log('UPLOAD_IMAGE_ERROR')
          } else if (imageUploaded) {
            res.status = 200;
            res.message = msg.filename;
            console.log('CUSTOMER_IMAGE_UPLOADED')
          } else {
            console.log('Nothing happened during this call.')
          }
          callback(null, res);
        });
      }
    });
  }
  if (msg.path === "rest_image") {
    console.log('Inside Restaurant Image Upload POST method');
    Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
      console.log(err,restaurant);
      if (err) {
        console.log('Restaurant Image Upload Error');
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      }
      if (restaurant) {
        restaurant.rest_images.push(msg.filename);
        restaurant.save((err, imageUploaded) => {
          if (err) {
            res.status = 500;
            res.message = 'UPLOAD_IMAGE_ERROR';
            console.log('UPLOAD_IMAGE_ERROR for Restaurant')
          } else if (imageUploaded) {
            res.status = 200;
            res.message = msg.filename;
            console.log('RESTAURANT_IMAGE_UPLOADED for Restaurant')
          } else {
            console.log('Nothing happened during this call.')
          }
          callback(null, res);
        });
      }
    });
  }
};

exports.handle_request = handle_request;