const express = require('express');
const { checkAuthCust } = require('../../config/passport');

const router = express.Router();
const Customer = require('../../models/cust_profile');

router.get('/:customer_id', checkAuthCust, (req, res) => {
  console.log('Inside Profile GET method');
  Customer.findById(req.params.customer_id, (error, customer) => {
    if (error) {
      res.status(500).end('System Error Occured');
    }
    if (customer) {
      console.log('Customer Object retrived : ', customer);
      const customerProfile = {
        customer_id: customer._id,
        name: customer.name,
        email_id: customer.email_id,
        phone: customer.phone,
        dob: customer.dob,
        city: customer.city,
        state: customer.state,
        country: customer.country,
        nick_name: customer.nick_name,
        about: customer.about,
        join_date: customer.join_date,
        favourite_restaurant: customer.favourite_restaurant,
        favourite_hobby: customer.favourite_hobby,
        blog_url: customer.blog_url,
      };
      console.log('Customer Object mapped : ', customerProfile);
      res.status(200).json(customerProfile);
    }
  });
});

module.exports = router;
