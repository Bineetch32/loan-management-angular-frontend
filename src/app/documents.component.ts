import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector:'app-documents',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterLink],
  templateUrl:'./documents.component.html',
  styleUrls:['./documents.component.css']
})
export class DocumentsComponent{
  loanId=0;
  documentType='Aadhaar';
  file:File|null=null;
  documents:any[]=[];
  message='';
  errorMessage='';
  uploading=false;

  private base='http://localhost:8081';

  constructor(private http:HttpClient,private route:ActivatedRoute){
    this.loanId=+(this.route.snapshot.paramMap.get('loanId')||0);
    this.load();
  }

  load(){
    if(!this.loanId)return;
    this.http.get<any[]>(this.base+'/api/documents/loan/'+this.loanId).subscribe({
      next:x=>this.documents=x,
      error:()=>this.errorMessage='Unable to load documents.'
    });
  }

  choose(event:any){
    this.file=event.target.files?.[0]||null;
    this.message='';
    this.errorMessage='';
  }

  upload(){
    if(!this.file)return;

    const data=new FormData();
    data.append('loanId',String(this.loanId));
    data.append('documentType',this.documentType);
    data.append('file',this.file);

    this.uploading=true;
    this.message='';
    this.errorMessage='';

    this.http.post(this.base+'/api/documents/upload',data).subscribe({
      next:()=>{
        this.message='Document uploaded successfully.';
        this.file=null;
        this.uploading=false;
        this.load();
      },
      error:()=>{
        this.errorMessage='Document upload failed. Please check that the backend is running.';
        this.uploading=false;
      }
    });
  }

  verify(id:number){
    this.http.put(this.base+'/api/documents/'+id+'/verify',{}).subscribe({
      next:()=>{this.message='Document verified successfully.';this.load()},
      error:()=>this.errorMessage='Document could not be verified.'
    });
  }

  reject(id:number){
    this.http.put(this.base+'/api/documents/'+id+'/reject',{}).subscribe({
      next:()=>{this.message='Document rejected.';this.load()},
      error:()=>this.errorMessage='Document could not be rejected.'
    });
  }
}