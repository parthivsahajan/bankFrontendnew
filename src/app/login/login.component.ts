import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  erroeMsg:string=''
  successMsg:boolean=false
   
  // login form group 
  loginForm = this.fb.group({
    // array 
    
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){

  }

  login(){
    if(this.loginForm.valid){
      let acno=this.loginForm.value.acno
      let pswd=this.loginForm.value.pswd
      //login api call
      this.api.login(acno,pswd)
      .subscribe(
        // success  
            (result:any)=>{
              this.successMsg=true
             // store user name in local storage 
              localStorage.setItem("username",result.username)
             // store cuurentAcno in local storage 
              localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
             // store token in local storage 
              localStorage.setItem("token",result.token) 
            // alert(result.message)
            //navigate dashboard
            setTimeout(()=>{
            //navigate dashboard
            this.router.navigateByUrl('dashboard')
            },2000)
          },
            // client error
            (result :any)=>{
              this.erroeMsg=result.error.message
              setTimeout(()=>{
                this.erroeMsg=""
                this.loginForm.reset()
              },(3000));
            }
          )
  
    }else{
      alert('Invalide account number')
    }
  }
}


