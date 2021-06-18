import { Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, NgForm} from '@angular/forms';
import {ServicesService} from '../services.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})

export class DasboardComponent implements OnInit {
  data$ :any =[]; 
  constructor(
    public dialogRef: MatDialogRef<DasboardComponent>,
    private a: ServicesService,
    private fb:FormBuilder,
    private servicen: NotificationsService
    ) {}
     ActionForm = this.fb.group({
      type: '',
      payload: '' ,
    });
    override ={
      position:['bottom','right'],
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    }
    onSuccess(message: any){
      this.servicen.success( 'Success' , message , this.override )
    }
    onFailed(message: any){
      this.servicen.error( 'Failed' , message , this.override )
    }

    onSubmit() {
      let exist: boolean = false;
      let formAction = {
        id: Math.random() ,
        type : this.ActionForm.value.type,
        payload : this.ActionForm.value.payload
      };
      if(JSON.parse(localStorage.getItem('Actions') || '{}').length>0){
       
   for(let i =0 ; i<JSON.parse(localStorage.getItem('Actions') || '{}').length;i++){
    if(formAction.type == JSON.parse(localStorage.getItem('Actions') || '{}')[i].type){
      exist = true;
      this.onFailed("Action Of Type: ( "+formAction.type+" ) Is Already Existe");
    }
    }
   }

if(!exist){
if(formAction.type != null && formAction.type != ""){
  this.a.addItemToLocalStorage(formAction,'Actions',exist)
  this.a.changeData('Actions',this.a.dataS)
  this.onSuccess("Action Of Type: ( "+formAction.type+" ) Is Added");
}else{
 this.servicen.warn('Alert',"You Have To Enter The Type Of The Action",this.override);
}
}
   this.ActionForm.reset();
  }
  close(): void {
  this.dialogRef.close();
  }
  ngOnInit(): void {
  
  }
}
