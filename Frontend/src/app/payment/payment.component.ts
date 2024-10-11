import { Component, OnInit} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { environment} from "../../environments/environment";  

import { SharingService } from '../services/getset.service'; 
import { ApiHttpService } from  '../services/rest.service'; 

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
	 
	showloading:boolean=false;
	showerror:boolean=false;
	name:string="";
	email:string="";
	phone:string="";
	address:string="";
	sessionid:string;
	customerid:string;
	errormsg:string;
	
	pagestatus:boolean=true;
	pstatus:string;
	
	constructor(	
			private route: Router, 
			private sharingservice: SharingService,
			private apicall:ApiHttpService
	){ }

	ngOnInit() {	
		this.showloading=true; 
		this.sharingservice.getAllFromIndexDb().then(res=>{	 
			if(Object.keys(res).length>0){		
				if(res['signupdata']){
					this.name 		= res['signupdata']['name'];
					this.email 		= res['signupdata']['email'];
					this.phone 		= res['signupdata']['phone']; 
					this.address 	= res['signupdata']['address'];
					this.sessionid	= res['session_id'];
					this.customerid	= res['customer_id'];	
					
					let payload = {
						sessionid:this.sessionid,
						customerid:this.customerid
					}
					 
					if(this.sessionid!=''){ 
					
						this.apicall.post('paymentstatus',payload).then((result) => {
							this.pagestatus = false;
							this.showloading=false;  
							this.pstatus = result['payment_status']; 
							
							this.sharingservice.addToIndexDb('session_id','').then(res1 =>{});

						},(err) => {					 
							this.errormsg=err;		
						});	
					}else{
						this.pagestatus = true;	
					}

					this.showloading=false;  	
					this.sharingservice.setCount(2);
				} 
			 
			} 
			
			this.showloading=false; 
			
		}); 

	}

	bgcolor(){
		this.sharingservice.setCount(0);
	}	
	
}	
