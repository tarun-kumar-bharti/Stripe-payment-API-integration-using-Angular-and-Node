import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs'; 
import { SharingService } from '../services/getset.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',   
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	  
	pageflag:number=0;
	subscription: Subscription;  
	constructor(private sharingservice: SharingService){} 

	ngOnInit() { 
			
		this.subscription = this.sharingservice.currentCount.subscribe(pageflag => {  
			this.pageflag = pageflag;
		});		 
	} 

	bgcolor(num){
		this.pageflag = num;
	}

	ngOnDestroy() {
		 this.subscription.unsubscribe();  
	}	
}
