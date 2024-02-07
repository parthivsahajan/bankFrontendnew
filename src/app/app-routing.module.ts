import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    // login http://localhost:4200/
    path:'',component:LoginComponent
  },
  {
    // login http://localhost:4200/register 
    path:'register',component:RegisterComponent
  },
  {
    // login http://localhost:4200/dashboard 
    path:'dashboard',component:DashboardComponent
  },
  {
    // transactionsComponent 
    path:'transactions',component:TransactionsComponent
  },

  {
    //PageNotFoundComponent\
    path:'**',component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
