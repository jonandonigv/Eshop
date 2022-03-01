const router = require('express').Router();
const stripe = require('stripe');

router.post('/payment', (req, res, next) => {
    stripe.charges.create({
        source: req.body.tokenId,
        ammount: req.body.ammount,
        currency: "usd",
    },
    (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;