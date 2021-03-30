import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:any;
  userCredObj:any;
  registerForm: FormGroup=new FormGroup({});
    submitted: boolean=false;
  constructor(private rt:Router, private us:UserService) { }
  ngOnInit(): void {
    this.registerForm=new FormGroup({
    
      username:new FormControl(null,Validators.required),

      password:new FormControl(null,Validators.required),
  
    })
  }
  onRegister()
  {
    this.rt.navigateByUrl("/register")
  }

  getControls(){
    return this.registerForm.controls;
  }
  forgot(){
    this.rt.navigateByUrl("/reset")
  }
  onSubmit(){
    this.submitted=true;
    this.rt.navigateByUrl("/home")

    if(this.registerForm.valid)
    {
      this.userCredObj=this.registerForm.value
      this.us.loginUser(this.userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
            //store token and username in local storage
            localStorage.setItem("token",res["signedToken"])
            localStorage.setItem("username",res["username"])
            //navigate to user component

            window.location.reload ();


          }
          else{
            if(res["message"]=="Invalid username")
            {
              alert("Invalid Username")
            }
            if(res["message"]=="Invalid password")
            {
              alert("Invalid Password")
            }

            this.rt.navigateByUrl("/login")
          }
        },
        err=>{
          alert("Something went wrong in user login")
          console.log(err)
        }
      )

    }
  }
}