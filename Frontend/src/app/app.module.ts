
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
 
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent   } from './home/home.component';

import { InvoiceComponent} from './invoice/invoice.component';
import { PaymentComponent} from './payment/payment.component';

import { FooterComponent }  from './footer/footer.component';

import { RouterModule    } from '@angular/router';

import { environment     } from '../environments/environment';
import { SharingService  } from './services/getset.service';
import { ApiHttpService  } from './services/rest.service';

@NgModule({
  declarations: [
    AppComponent,
	HeaderComponent,
	HomeComponent, 
	InvoiceComponent,
	PaymentComponent,
	FooterComponent 
  ],
  imports: [
    BrowserModule, 
	FormsModule,
    HttpModule, 
	RouterModule.forRoot([	 
		{path: '',     component: HomeComponent},
		{path: 'invoice', component: InvoiceComponent},
		{path: 'payment', component: PaymentComponent}  
	]),
	 
  ],
  providers: [
   SharingService,
   ApiHttpService
  ],
  
   schemas: [],
	
  bootstrap: [AppComponent]
})
export class AppModule { }
