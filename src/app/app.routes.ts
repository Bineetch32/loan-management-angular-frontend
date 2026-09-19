import {Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {DashboardComponent} from './dashboard.component';
import {LoanFormComponent} from './loan-form.component';
import {LoansComponent} from './loans.component';
import {EmiComponent} from './emi.component';
export const routes:Routes=[
{path:'login',component:LoginComponent},{path:'dashboard',component:DashboardComponent},
{path:'loans',component:LoansComponent},{path:'loan/new',component:LoanFormComponent},
{path:'loan/edit/:id',component:LoanFormComponent},{path:'emi',component:EmiComponent},
{path:'',redirectTo:'login',pathMatch:'full'},{path:'**',redirectTo:'login'}];