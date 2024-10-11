const { NotFoundError } = require("../helpers/utility");
const config 			= require("../config/config");
const stripe 			= require('stripe')(config.STRIPE_SEC_KEY);

exports.createCustomerAtStripe = async function (customerdata) {	 
    const registerCustomer = await stripe.customers.create(customerdata);
    return registerCustomer; 
}

exports.checkoutAtStripe = async function (qty,customerid) {	 
    const session = await stripe.checkout.sessions.create({
		  success_url: config.STRIPE_REDIRECT_URL+'/payment', 
		  cancel_url:config.STRIPE_REDIRECT_URL+'/payment',
		  client_reference_id:customerid,
		  customer:customerid,
		  billing_address_collection:"auto",
		  mode: 'payment',
		  currency:config.STRIPE_CURRENCY,
		  invoice_creation:{
			enabled:true 
		  },
		  line_items: [
						{
						  price: config.STRIPE_PRICE_ID,
						  quantity: qty,
						} 
					] 
		});	
	return session; 			
}

exports.checkPaymentStatusAtStripe = async function (session_id) {
	const retsession = await stripe.checkout.sessions.retrieve(session_id);
	return retsession; 			
}	

exports.expireCheckoutSessionAtStripe = async function (session_id) {	 
	const retsession = await stripe.checkout.sessions.expire(session_id);
	return retsession; 			
}

exports.getInvoiceListFromStripe = async function (customerid) {	 
	let invoices = await stripe.invoices.list({customer:customerid});
	return invoices; 			
}
