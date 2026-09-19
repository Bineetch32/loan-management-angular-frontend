import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Loan,EmiResponse} from './models';

@Injectable({providedIn:'root'})
export class LoanService{
  private baseUrl='http://localhost:8081';

  constructor(private http:HttpClient){}

  getLoans(){return this.http.get<Loan[]>(this.baseUrl+'/api/loans')}
  getLoan(id:number){return this.http.get<Loan>(this.baseUrl+'/api/loans/'+id)}
  create(loan:Partial<Loan>){return this.http.post<Loan>(this.baseUrl+'/api/loans',loan)}
  update(id:number,loan:Partial<Loan>){return this.http.put<Loan>(this.baseUrl+'/api/loans/'+id,loan)}
  delete(id:number){return this.http.delete(this.baseUrl+'/api/loans/'+id,{responseType:'text'})}
  approve(id:number){return this.http.put<Loan>(this.baseUrl+'/api/loans/'+id+'/approve',{})}
  reject(id:number){return this.http.put<Loan>(this.baseUrl+'/api/loans/'+id+'/reject',{})}
  sanction(id:number){return this.http.put<Loan>(this.baseUrl+'/api/loans/'+id+'/sanction',{})}

  generateSanctionLetter(id:number){
    return this.http.get(this.baseUrl+'/api/loans/'+id+'/sanction-letter',{responseType:'text'})
  }

  downloadSanctionLetter(id:number){
    return this.http.get(this.baseUrl+'/api/loans/'+id+'/sanction-letter/download',{responseType:'blob'})
  }

  emi(data:{loanAmount:number;annualInterestRate:number;tenureInYears:number}){
    return this.http.post<EmiResponse>(this.baseUrl+'/api/emi',data)
  }
}