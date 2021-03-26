const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: config.get('client_id'),
  client_secret: config.get('client_secret'),
});

// Make payment through paypal
router.post('/', auth, async (req, res) => {
  try {
    const create_payment_json = req.body;

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.json({ forwardLink: payment.links[i].href });
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '25.00',
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
      }
    }
  );
});
module.exports = router;
