const Customer = require('../models/cust_profile');

function handle_request(msg, callback) {
    var res = {};

    if (msg.path === "customer_get") {
        console.log('Inside Profile GET method');
        Customer.findById(msg.customer_id, (error, customer) => {
            if (error) {
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
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
                res.status = 200;
                res.message = JSON.stringify(customerProfile);
            } else {
                res.status = 404;
                res.message = 'CUST_INVALID';
            }
            callback(null, res);
        });
    } else if (msg.path === "customer_update") {
        console.log('Inside Profile POST method');
        Customer.findById(msg.customer_id, (err, customer) => {
          if (err) {
            res.status = 500;
            res.message = 'SYSTEM_ERROR';
            callback(null, res);
          }
          if (customer) {
            Customer.findOneAndUpdate({ _id: msg.user_id },
              {
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
              },
              {
                new: true
              },
              (err, updatedCustomer) => {
                if (err) {
                  res.status = 500;
                  res.message = 'UPDATE_DATA_ERROR';
                }
                if (updatedCustomer) {
                  res.status = 200;
                  res.message = "CUSTOMER_UPDATED";
                }
                callback(null, res);
              }
            );
          }
        });
    }

};

exports.handle_request = handle_request;