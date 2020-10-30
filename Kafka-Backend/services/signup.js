const passwordHash = require('password-hash');
const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
    var res = {};

    if (msg.url === "/customers") {

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
            res.end('CUST_SIGNUP_ERROR', err.message);
            }
            if (customer) {
            console.error('Customer already present error');
            res.writeHead(500, {
                'Content-Type': 'application/json',
            });
            res.end('CUST_PRESENT');
            } else {
            newCustomer.save((error, response) => {
                if (error) {
                console.error('Error creating customer');
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                res.end('CUST_SIGNUP_ERROR');
                } else if (response) {
                console.log('Response success : ', response);
                res.status(200).end('CUST_SIGNUP_SUCCESS');
                }
            });
            }
        });
    }
    else if (msg.url === "/restaurants") {

        const hashedPassword = passwordHash.generate(req.body.password);
        console.log('Password hash completed');

        const newRestaurant = new Restaurant({
            name: req.body.name,
            email_id: req.body.email_id,
            password: hashedPassword,
            location: req.body.location,
        });
        console.log('New Restaurant Object', newRestaurant);

        Restaurant.findOne({ email_id: req.body.email_id }, (err, restaurant) => {
            if (err) {
            console.error('Connection error : ', err);
            res.writeHead(500, {
                'Content-Type': 'application/json',
            });
            res.end('REST_SIGNUP_ERROR', err.message);
            }
            if (restaurant) {
            console.error('Restaurant already present error');
            res.writeHead(500, {
                'Content-Type': 'application/json',
            });
            res.end('REST_PRESENT');
            } else {
            newRestaurant.save((error, response) => {
                if (error) {
                console.error('Error creating Restaurant');
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                res.end('REST_SIGNUP_ERROR');
                } else if (response) {
                console.log('Response success : ', response);
                res.status(200).end('REST_SIGNUP_SUCCESS');
                }
            });
            }
        });
    }
};

exports.handle_request = handle_request;