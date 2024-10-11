import { Component, OnInit} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { environment} from "../../environments/environment";  

import { SharingService } from '../services/getset.service'; 
import { ApiHttpService } from  '../services/rest.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',   
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	showloading:boolean=false;
	showerror:boolean=false;
	btndisabled:boolean=true;
	btnmindisabled:boolean=true;
	name:string="";
	email:string="";
	phone:string="";
	address:string="";
    errormsg:string="";
	quantity:number=1;
	customerid:string="";
	
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
					this.customerid	= res['customer_id'];	
					this.showloading=false;  
				}
			} 
			this.showloading=false;  
			this.checkInput();
		});	

		this.showloading=false;  
		this.checkInput();	
	} 
	
	checkout(){
		this.showloading=true; 
		
		let payload = { 
			name: this.name,
			email: this.email,
			phone: this.phone,									   
			address: this.address,
			quantity:this.quantity,
			customerid:this.customerid
		};
		  
		this.apicall.post('checkout',payload).then((result) => {	 
			if(result['session_id']!=''){				
				this.sharingservice.addToIndexDb('session_id',result['session_id']).then(res1 =>{}); 
				this.sharingservice.addToIndexDb('customer_id',result['customer_id']).then(res2 =>{}); 
				this.sharingservice.addToIndexDb('signupdata',payload).then(res3 =>{});						
				this.showloading=false;
				window.location.assign(result['session_url']);									
			}		
			 		
		},(err) => {					 
			this.errormsg=err;		
		});	 
	}
	 
  
	checkInput(){
		if(this.name!='' && this.email!='' && this.phone!='' && this.address!=''){
			this.btndisabled=false;
		}else{
			this.btndisabled=true;
		} 
	}
	
	getName(value){	  
		this.name = value;  
		this.checkInput();
	}
	
	getEmail(value){	  
		this.email = value;  
		this.checkInput();
	}
	
	getPhone(value){	  
		this.phone = value;  
		this.checkInput();
	} 
	
	getAddress(value){	  
		this.address = value;  
		this.checkInput();
	}		
	
	getMinValue(){		
		if(this.quantity>1){
			this.quantity =  this.quantity-1;
			this.btnmindisabled=false;
		}else{
			this.btnmindisabled=true;
		}	 
	} 
	
	getMaxValue(){		
		if(this.quantity>0){
			this.quantity =  this.quantity+1;
			this.btnmindisabled=false;
		}else{
			this.btnmindisabled=true;
		}
		 
	} 
			
}