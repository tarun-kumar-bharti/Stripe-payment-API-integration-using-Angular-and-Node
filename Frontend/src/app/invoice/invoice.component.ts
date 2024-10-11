import { Component, OnInit} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { environment} from "../../environments/environment";  

import { SharingService } from '../services/getset.service'; 
import { ApiHttpService } from  '../services/rest.service'; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
	 
	showloading:boolean=false;
	showerror:boolean=false;
	 
	customerid:string;
	errormsg:string;
	
	invoicelist:any;
	 
	constructor(	
			private route: Router, 
			private sharingservice: SharingService,
			private apicall:ApiHttpService
	){ }

	ngOnInit() {	
		this.showloading=true; 
		this.sharingservice.getAllFromIndexDb().then(res=>{	 
			if(Object.keys(res).length>0){		
				if(res['customer_id']){
					 
					this.customerid	= res['customer_id'];	 
					let payload = { 
						customerid:this.customerid
					}
					
					this.apicall.post('invoicelist',payload).then((result) => {
						 this.invoicelist = result; 
					},(err) => {					 
						this.errormsg=err;		
					});	 

					this.showloading=false;  	
					this.sharingservice.setCount(1); 
				} 
			 
			}else{
				this.showloading=false;  
			}				
			
		}); 
		 
	} 
	
}	

