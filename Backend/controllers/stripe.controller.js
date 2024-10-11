const { NotFoundError } = require("../helpers/utility");
const config 			= require("../config/config");

const StripeService 	= require("../helpers/stripe.service");

exports.checkout = async (req, res) => { 
	let reqdata = { 
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address : { 
			line1		: req.body.address,
			city		: "",
			postal_code	: "",
			state		: "",
			country		: "India"
		}	
	};
	
	let qty = req.body.quantity;
	let customerid = req.body.customerid;
	
	delete req.body.quantity;	
	delete req.body.customerid;	
	 
	try {	
			if(customerid==""){				
				const customerreg = await StripeService.createCustomerAtStripe(reqdata); 
				customerid = customerreg.id;
			}
			
			if(customerid){				
				const session = await StripeService.checkoutAtStripe(qty,customerid);		 
				res.status(200).send({ 
					session_id:session.id,
					session_url:session.url,
					customer_id:customerid
				});			
			}			
							
	}catch (err) { 
			res.status(500).send(err.message);		 
	} 
};

exports.paymentstatus = async (req, res) => { 
	try {	
		let session_id = req.body.sessionid;	
		const retsession = await StripeService.checkPaymentStatusAtStripe(session_id); 
		if(retsession.status=='open'){	
			await StripeService.expireCheckoutSessionAtStripe(session_id);		 
		}
		res.status(200).send(retsession); 
	}catch (err) { 
		res.status(500).send(err.message);		 
	} 
};
 
exports.invoicelist = async (req, res) => { 
	try {
		let customerid = req.body.customerid ; 
		var invoiceList = [];	
		const invoices = await StripeService.getInvoiceListFromStripe(customerid); 
		if(invoices.data.length>0){
			invoices.data.forEach(element => {
				var createddate = new Date(element.created * 1000);
				invoiceList.push({
						id:element.id, 
						number:element.number,   
						file: element.invoice_pdf,  
						amount_paid:element.amount_paid/100,
						created:createddate.toLocaleDateString("en-US")+" "+createddate.toLocaleTimeString("en-US"),
						status:element.status                   
				});
			});
		}	 
		res.status(200).send(invoiceList); 
	}catch (err) { 
		res.status(500).send(err.message);		 
	} 	
}
