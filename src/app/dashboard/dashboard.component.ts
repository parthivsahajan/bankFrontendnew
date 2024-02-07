import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import party from "party-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  logoutDiv:boolean=false
  fundTransferSuccessMsg:string=''
  fundTransferErrorMsg:string=''
  isCollapse:boolean=true
  user:string=''
  currentAcno:Number=0
  balance:Number=0
  depositMsg:string=''
  acno:any="";
  deleteConfirm:boolean=false
  deleteSpinnerDiv:boolean=false

  depositForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })

  FundTransferForm=this.fb.group({
    //array
    toAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  constructor(private api:ApiService, private fb:FormBuilder,private router:Router){

  }

  ngOnInit() {
   // to check the account holder already logged in
    if(!localStorage.getItem("token")){
      alert("Please Login!!!")
       //navigate to login
       this.router.navigateByUrl('')
    }


    if(localStorage.getItem("username")){
      this.user= localStorage.getItem("username")||''
    }
  
  }

  Collapse(){
    this.isCollapse=!this.isCollapse
  }

// Balance enquiry

  getBalance(){
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'')
      console.log(this.currentAcno)
      this.api.getBalance(this.currentAcno)
      .subscribe((result:any)=>{
        console.log(result)
        this.balance=result.balance
      })

     }
  }

  // deposit 
  deposit(){
    if(this.depositForm.valid){
      let amount=this.depositForm.value.amount
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'')
      this.api.deposit(this.currentAcno,amount)
      .subscribe(
        //success case
        (result:any)=>{
          console.log(result);
          this.depositMsg=result.message
          setTimeout(()=>{
            this.depositForm.reset()
            this.depositMsg=''
          },2000)
        },
        //error case
        (result:any)=>{
          this.depositMsg=result.error.message
        }
      )
      
    }
    else{
      alert('Invalid Form')
    }
  }

  //showconfetti
  showconfetti(source:any){
    party.confetti(source);
  }

  // transfer

transfer(){
  if(this.FundTransferForm.valid){
    let toAcno =this.FundTransferForm.value.toAcno
    let pswd =this.FundTransferForm.value.pswd
    let amount =this.FundTransferForm.value.amount
    //make api call for fundTransfer
    this.api.fundTransfer(toAcno,pswd,amount)
    .subscribe(
      //success case
      (result:any)=>{
        this.fundTransferSuccessMsg = result.message
        setTimeout(()=>{
          this.fundTransferSuccessMsg=""
        },5000)
      },
      //client error
      (result:any)=>{
        this.fundTransferErrorMsg = result.error.message
        setTimeout(()=>{
          this.fundTransferErrorMsg=""
        },5000)
      }
    )
  }else{
    alert("Invalid Form")
  }
  setTimeout(()=>{
    this.FundTransferForm.reset()
  },5000)
}

//Clear fundTransfer form

clearFundTransferForm(){
  this.fundTransferErrorMsg=""
  this.fundTransferSuccessMsg=""
  this.FundTransferForm.reset()
}

//logout
logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("currentAcno")
  this.logoutDiv=true
 
  setTimeout(() => {
    //navigate to login
    this.router.navigateByUrl('')
    this.logoutDiv=false
  },4000);
}

// deleteAccountFromNaveBar
   
deleteAccountFromNaveBar(){
  this.acno = localStorage.getItem('currentAcno')
  this.deleteConfirm = true
}

onCancel(){
  this.acno =""
  this.deleteConfirm = false
}

onDelete(event:any){
  let deleteAcno = JSON.parse(event)
  this.api.deleteAccount(deleteAcno)
  .subscribe(
    (result:any)=>{
      this.acno =""
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("currentAcno")
      this.deleteSpinnerDiv=true
      setTimeout(() => {
        //navigate to login
        this.router.navigateByUrl('')
        this.deleteSpinnerDiv=false
      },4000);
      
    },
    (result:any)=>{
      alert(result.error.message)
    }
  )
}

}
