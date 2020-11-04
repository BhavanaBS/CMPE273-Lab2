const express = require('express');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/:order_id', checkAuth, (req, res) => {
  req.body.method = req.method;
  req.body.order_id = req.params.order_id;

  kafka.make_request('messages', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/', checkAuth, (req, res) => {
  req.body.method = req.method;

  kafka.make_request('messages', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
