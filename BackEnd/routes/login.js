const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { auth } = require('../config/passport');

const router = express.Router();
const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');
const { secret } = require('../config/configuration');

auth();

router.post('/customers', (req, res) => {
  console.log('Requested Login : ', req.body.email_id);
  Customer.findOne({ email_id: req.body.email_id }, (error, customer) => {
    if (error) {
      res.status(500).end('SYS_ERROR');
    }
    if (!customer) {
      res.status(401).end('CUST_INVALID');
    }
    if (customer) {
      if (passwordHash.verify(req.body.password, customer.password)) {
        console.log(customer);
        const payload = {
          customer_id: customer._id,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).json({ success: true, token: `JWT ${token}` });
      } else {
        res.status(401).end('CUST_INVALID_CRED');
      }
    }
  });
});

router.post('/restaurants', (req, res) => {
  Restaurant.findOne({ email_id: req.body.email_id }, (error, restaurant) => {
    if (error) {
      res.status(500).end('SYS_ERROR');
    }
    if (!restaurant) {
      res.status(401).end('REST_INVALID');
    }
    if (restaurant) {
      if (passwordHash.verify(req.body.password, restaurant.password)) {
        console.log(restaurant);
        const payload = {
          restaurant_id: restaurant._id,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).json({ success: true, token: `JWT ${token}` });
      } else {
        res.status(401).end('REST_INVALID_CRED');
      }
    }
  });
});
module.exports = router;
