const passwordHash = require('password-hash');
const express = require('express');
const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

const router = express.Router();

router.post('/customers', (req, res) => {
  const hashedPassword = passwordHash.generate(req.body.password);
  console.log('Password hash completed');
  const newCustomer = new Customer({
    name: req.body.name,
    email_id: req.body.email_id,
    password: hashedPassword,
  });

  console.log('New Customer Object', newCustomer);
  Customer.findOne({ email_id: req.body.email_id }, (err, customer) => {
    if (err) {
      console.error('Connection error : ', err);
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end('Customer Creation Failed!', err.message);
    }
    if (customer) {
      console.error('Customer already present error');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end('Customer Already Present!');
    } else {
      newCustomer.save((error, response) => {
        if (error) {
          console.error('Error creating customer');
          res.writeHead(500, {
            'Content-Type': 'application/json',
          });
          res.end('Customer Creation Failed!');
        } else if (response) {
          console.log('Response success : ', response);
          res.status(200).end();
        }
      });
    }
  });
});

router.post('/restaurants', (req, res) => {
  const hashedPassword = passwordHash.generate(req.body.password);
  console.log('Password hash completed');
  const newRestaurant = new Restaurant({
    name: req.body.name,
    email_id: req.body.email_id,
    password: hashedPassword,
    location: req.body.location,
  });

  console.log('New Restaurant Object', newRestaurant);
  Customer.findOne({ email_id: req.body.email_id }, (err, restaurant) => {
    if (err) {
      console.error('Connection error : ', err);
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end('Restaurant Creation Failed!', err.message);
    }
    if (restaurant) {
      console.error('Restaurant already present error');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end('Restaurant Already Present!');
    } else {
      newRestaurant.save((error, response) => {
        if (error) {
          console.error('Error creating Restaurant');
          res.writeHead(500, {
            'Content-Type': 'application/json',
          });
          res.end('Restaurant Creation Failed!');
        } else if (response) {
          console.log('Response success : ', response);
          res.status(200).end();
        }
      });
    }
  });
});

module.exports = router;
