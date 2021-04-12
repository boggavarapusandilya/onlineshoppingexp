import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/adminservice.service';

@Component({
  selector: 'app-viewadminproducts',
  templateUrl: './viewadminproducts.component.html',
  styleUrls: ['./viewadminproducts.component.css']
})
export class ViewadminproductsComponent implements OnInit {
  lengthofarray : any;
  listObj:any;
  spinning:any=0;
  constructor( private as:AdminserviceService,private router:Router) { }

  ngOnInit(): void {
    this.listObj=this.as.getlist().subscribe(
      res=>{ 
        if(res.message){
          this.listObj=res.message;
          console.log(this.listObj);
          this.lengthofarray=this.listObj.length;
          this.spinning=1;
          }
      }, 
      err=>{ 
        console.log("Something went wrong") 
        console.log(err)
       }
  ) 
  }
  delete(ing:number){
    let obj=this.listObj[ing];
    console.log("the deleted obj is ",obj)

    this.as.deleteProduct(obj).subscribe(
      res=>{
        if(res.message){
          console.log("Product removed successfully");
          window.location.reload();
        
        }
      },
      err=>{
        console.log("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
  edit(one:any){
    console.log(one);
    localStorage.setItem("pname",one["pname"]);
    this.router.navigateByUrl("/admindashboard/updatedetails");
    
  }
  reloadPage() {
    window.location.reload();
 }
  

}
