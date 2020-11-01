const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/customers/:customer_id/profile/:profile_pic', (req, res) => {
  const image = `${path.join(__dirname, '..')}/public/uploads/customers/${req.params.profile_pic}`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${path.join(__dirname, '..')}/public/uploads/customers/profile.png`);
  }
});

router.get('/restaurants/:restaurant_id/profile/:rest_image', (req, res) => {
  const image = `${path.join(__dirname, '..')}/public/uploads/restaurants/${req.params.rest_image}`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${path.join(__dirname, '..')}/public/uploads/restaurants/yelp.png`);
  }
});

module.exports = router;
