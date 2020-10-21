const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passportRest = require('passport');
const passportCust = require('passport');
const { secret } = require('./configuration');
const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

// Setup work and export for the JWT passport strategy
function custAuth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: secret,
  };
  passportCust.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const customer_id = jwt_payload.customer_id;
      Customer.findById(customer_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

function restAuth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: secret,
  };
  passportRest.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const restaurant_id = jwt_payload.restaurant_id;
      Restaurant.findById(restaurant_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.custAuth = custAuth;
exports.restAuth = restAuth;
exports.checkAuthCust = passportCust.authenticate('jwt', { session: false });
exports.checkAuthRest = passportRest.authenticate('jwt', { session: false });
