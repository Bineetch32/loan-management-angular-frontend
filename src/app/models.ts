export type LoanType='HOME_LOAN'|'PERSONAL_LOAN'|'CAR_LOAN'|'EDUCATION_LOAN';
export type LoanStatus='PENDING'|'APPROVED'|'REJECTED'|'SANCTIONED';
export interface Loan{id:number;customerName:string;loanType:LoanType;loanAmount:number;loanPurpose:string;status:LoanStatus;cibilScore:number}
export interface EmiResponse{monthlyEmi:number;totalPayment:number;totalInterest:number}