const router = require("express").Router();
const dotenv = require('dotenv')
dotenv.config()

const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

// if(process.env.STRIPE_KEY) { 
//     console.log(process.env.STRIPE_KEY); 
// }
// else { 
//     console.log('No set!'); 
// }

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
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