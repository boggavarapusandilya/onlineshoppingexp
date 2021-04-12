import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private hc:HttpClient) { }
  createproduct(proObj:any):Observable<any>{
    console.log("products is",proObj);
    
    return this.hc.post("/admin/productdetails",proObj);
  }
  getlist():Observable<any>{
    return this.hc.get("/admin/allproducts")
  }
  deleteProduct(obj:any):Observable<any>{
    console.log("products is",obj);
    
    return this.hc.post("/admin/delete",obj);
  }
  getcurrentdata(pname:any):Observable<any>{
    console.log("in service product name is",pname)
    return this.hc.get("/admin/getproductdata/"+pname);
  }
 
  editproduct(obj:any):Observable<any>{
    //console.log(obj," in ds")
    return this.hc.put("/admin/updateproduct",obj)
  }
}
