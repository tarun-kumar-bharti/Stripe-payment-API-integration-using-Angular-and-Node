
import { Injectable } from '@angular/core'; 
import { Http,Headers } from '@angular/http'; 
 
import { Observable } from 'rxjs'; 
import { environment } from '../../environments/environment'; 

@Injectable()
export class ApiHttpService { 
	
	apiUrl:string = environment.apiurl;
	
	constructor( private http: Http){ }
	
	public get(url: string, options?: any) { 
		
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		headers.append('Access-Control-Allow-Origin','*');
	
		  
		return new Promise((resolve, reject) => {
			this.http.get(this.apiUrl+url, {headers: headers})
			.subscribe(res => {			   
			  resolve(res.json());
			}, (err) => {			   
			  reject(err.json());
			});
		});  
	} 
	
	public post(url: string, data: any, options?: any) { 
	
		var headers = new Headers();
		headers.append('Content-Type', 'application/json' );		
		 
		if(data.hasOwnProperty('token')){
			headers.append('Authorization', 'Bearer '+data.token); 
			delete data.token;
		}	
				
		return new Promise((resolve, reject) => {
		  this.http.post(this.apiUrl+url,data,{headers: headers})
			.subscribe(res => { 
			  resolve(res.json());
			}, (err) => { 
			  reject(err.json());
			});
		});		 
	}
	
	public put(url: string, data: any, options?: any) { 
		 
		var headers = new Headers();
		headers.append('Content-Type', 'application/json' );
		
		if(data.hasOwnProperty('token')){
			headers.append('Authorization', 'Bearer '+data.token); 
			delete data.token;
		}
		
		return new Promise((resolve, reject) => {
		  this.http.put(this.apiUrl+url,data,{headers: headers})
			.subscribe(res => { 
			  resolve(res.json());
			}, (err) => { 
			  reject(err.json());
			});
		});	
		
		
	} 
	
	public delete(url: string, data: any, options?: any) { 
		
		var headers = new Headers();
		headers.append('Content-Type', 'application/json' );
		
		if(data.hasOwnProperty('token')){
			headers.append('Authorization', 'Bearer '+data.token); 
			delete data.token;
		}
		
		return new Promise((resolve, reject) => {
		  this.http.delete(this.apiUrl+url,{headers: headers})
			.subscribe(res => { 
			  resolve(res.json());
			}, (err) => { 
			  reject(err.json());
			});
		});	
	} 
}