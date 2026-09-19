import {Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {LoanService} from './loan.service';
import {LoanType,LoanStatus} from './models';

@Component({
  selector:'app-loan-form',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./loan-form.component.html'
})
export class LoanFormComponent implements OnInit{
  id:number|null=null;
  saving=false;
  errorMessage='';

  types:LoanType[]=['HOME_LOAN','PERSONAL_LOAN','CAR_LOAN','EDUCATION_LOAN'];
  statuses:LoanStatus[]=['PENDING','APPROVED','REJECTED','SANCTIONED'];

  loan:any={
    customerName:'',
    loanType:'HOME_LOAN',
    loanAmount:0,
    loanPurpose:'',
    status:'PENDING',
    cibilScore:700
  };

  constructor(
    private service:LoanService,
    private route:ActivatedRoute,
    public router:Router
  ){}

  ngOnInit(){
    const value=this.route.snapshot.paramMap.get('id');

    if(value){
      this.id=+value;
      this.service.getLoan(this.id).subscribe({
        next:x=>this.loan={...x},
        error:()=>this.errorMessage='Unable to load loan details.'
      });
    }
  }

  save(){
    this.errorMessage='';

    if(this.loan.loanAmount<=0 || this.loan.cibilScore<300 || this.loan.cibilScore>900){
      this.errorMessage='Please enter valid loan amount and CIBIL score.';
      return;
    }

    this.saving=true;

    const request=this.id
      ? this.service.update(this.id,this.loan)
      : this.service.create(this.loan);

    request.subscribe({
      next:()=>this.router.navigate(['/loans']),
      error:(error)=>{
        console.error(error);
        this.saving=false;
        this.errorMessage='Loan could not be saved. Please check that the Spring Boot backend is running on port 8081.';
      }
    });
  }
}