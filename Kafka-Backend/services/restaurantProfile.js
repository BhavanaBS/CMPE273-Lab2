const Restaurant = require('../models/rest_profile');
const passwordHash = require('password-hash');

function handle_request(msg, callback) {
    var res = {};
    console.log('Calling Restaurant method : ', msg.path);
    if (msg.path === "restaurant_get") {
        console.log('Inside Profile GET method');
        Restaurant.findById(msg.restaurant_id, (error, restaurant) => {
            if (error) {
                res.status = 500;
                res.message = "SYSTEM_ERROR";
            }
            if (restaurant) {
                console.log('Restaurant Object retrived : ', restaurant);
                const restaurantProfile = {
                    restaurant_id: restaurant._id,
                    name: restaurant.name,
                    email_id: restaurant.email_id,
                    location: restaurant.location,
                    phone: restaurant.phone,
                    description: restaurant.description,
                    timings: restaurant.timings,
                    cuisine: restaurant.cuisine,
                    delivery_method: restaurant.delivery_method,
                    map_location: restaurant.map_location,
                };
                console.log('Restaurant Object mapped : ', restaurantProfile);
                res.status = 200;
                res.message = JSON.stringify(restaurantProfile);
            } else {
                res.status = 404;
                res.message = 'REST_INVALID';
            }
            callback(null, res);
        });
    }
};

exports.handle_request = handle_request;