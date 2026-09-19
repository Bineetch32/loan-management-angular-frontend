import {Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {LoanService} from './loan.service';
import {Loan} from './models';

@Component({
  selector:'app-loan-details',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl:'./loan-details.component.html',
  styleUrls:['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit{
  loan:Loan|null=null;
  message='';
  errorMessage='';
  loading=true;

  constructor(private service:LoanService,private route:ActivatedRoute){}

  ngOnInit(){
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.service.getLoan(id).subscribe({
      next:x=>{this.loan=x;this.loading=false},
      error:()=>{this.errorMessage='Unable to load loan details.';this.loading=false}
    });
  }

  approve(){
    if(!this.loan)return;
    this.service.approve(this.loan.id).subscribe({
      next:x=>{this.loan=x;this.message='Loan approved successfully.'},
      error:e=>this.showError(e)
    });
  }

  reject(){
    if(!this.loan)return;
    this.service.reject(this.loan.id).subscribe({
      next:x=>{this.loan=x;this.message='Loan rejected successfully.'},
      error:e=>this.showError(e)
    });
  }

  sanction(){
    if(!this.loan)return;
    this.service.sanction(this.loan.id).subscribe({
      next:x=>{this.loan=x;this.message='Loan sanctioned successfully.'},
      error:e=>this.showError(e)
    });
  }

  generateLetter(){
    if(!this.loan)return;
    this.service.generateSanctionLetter(this.loan.id).subscribe({
      next:x=>this.message=x,
      error:e=>this.showError(e)
    });
  }

  downloadLetter(){
    if(!this.loan)return;
    this.service.downloadSanctionLetter(this.loan.id).subscribe({
      next:blob=>{
        const url=window.URL.createObjectURL(blob);
        const a=document.createElement('a');
        a.href=url;
        a.download='SanctionLetter_'+this.loan!.id+'.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error:e=>this.showError(e)
    });
  }

  private showError(error:any){
    console.error(error);
    this.message='';
    this.errorMessage='This action could not be completed. Please check the loan status and backend.';
  }
}