const router = require('express').Router(); 
const StripeController 	= require('../controllers/stripe.controller'); 

router.post('/checkout', StripeController.checkout); 
router.post('/paymentstatus', StripeController.paymentstatus); 
router.post('/invoicelist', StripeController.invoicelist); 


module.exports = router;