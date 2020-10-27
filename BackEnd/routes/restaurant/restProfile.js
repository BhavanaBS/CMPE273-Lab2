const express = require('express');
const { checkAuth } = require('../../config/passport');

const router = express.Router();
const Restaurant = require('../../models/rest_profile');

router.get('/:restaurant_id', checkAuth, (req, res) => {
  console.log('Inside Profile GET method');
  Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
    if (error) {
      res.status(500).end('System Error Occured');
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
      res.status(200).json(restaurantProfile);
    } else {
      res.status(404).end('Restaurant not found');
    }
  });
});
module.exports = router;
