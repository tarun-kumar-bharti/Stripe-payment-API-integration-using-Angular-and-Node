import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';

declare var db:any

@Injectable()
export class SharingService {

  constructor() { }
	
  public storagename:string = "webdata";		
	
  public getCount: BehaviorSubject<number> = new BehaviorSubject(0);
  currentCount = this.getCount.asObservable();
  public setCount(pageflag: number) {	  
    this.getCount.next(pageflag)
  }
  
    
  addToIndexDb(keyname,value){
	  
	return new Promise(async (resolve,reject)=>{		  
		if(db !=undefined){
			const request = await db.transaction([this.storagename],"readwrite")
							.objectStore(this.storagename)
							.put(value,keyname);				
			request.onsuccess = function(event){
				if(event.target.result){
					//console.log("success");
					resolve("success");
				}else{
					//console.log("error");
					resolve(false);
				}
			} 
		}
	});	 
	
  }
  
  getFromIndexDb(keyname){
	
	return new Promise(async (resolve,reject)=>{		  
		if(db !=undefined){
			const request = await db.transaction([this.storagename],"readwrite")
							.objectStore(this.storagename)
							.get(keyname);				
			request.onsuccess = function(event){
				if(event.target.result){
					//console.log("success");
					resolve(event.target.result);
				}else{
					//console.log("error");
					resolve(false);
				}
			} 
		}
	});		
	  
  }
  
  
   getAllFromIndexDb(){
	
	return new Promise(async (resolve,reject)=>{		  
		if(db !=undefined){
			var result= {};
			const request = await db.transaction([this.storagename],"readwrite")
							.objectStore(this.storagename)
							.openCursor();
							
			request.onsuccess = function(event){
				
				let cursor = event.target.result;
				if (cursor) {
				   let key = cursor.primaryKey;
				   let value = cursor.value;				   
				   result[key]=value;				 
				   cursor.continue();
				}
				else {
				  resolve(result);
				}				 
			} 
		}
	});		
	  
  }
   
  deleteFromIndexDb(keyname){
	  
	return new Promise(async (resolve,reject)=>{		  
		if(db !=undefined){
			const request = await db.transaction([this.storagename],"readwrite")
							.objectStore(this.storagename)
							.delete(keyname);				
			request.onsuccess = function(event){
				if(event.target.result){
					//console.log("success");
					resolve("success");
				}else{
					//console.log("error");
					resolve(false);
				}
			} 
		}
	});
	
  } 

}