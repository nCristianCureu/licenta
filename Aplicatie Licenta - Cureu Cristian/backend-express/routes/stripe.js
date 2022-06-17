const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// When we make a paymaner, the stripe is gonna return a tokenId
router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    }, //After creating the object it will return either an error or a response
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  ); 
});

module.exports = router;
