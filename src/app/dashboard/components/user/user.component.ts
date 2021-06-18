import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, NgForm} from '@angular/forms';
import { ServicesService } from '../services.service';
import { Tool } from '../tools/tool';
import { NotificationsService } from 'angular2-notifications';
export let initialState ="";
export const ELEMENT_DATA1:any = [];
export const stateOptions:any = [];
 const data:any = [];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  print: Tool = new Tool()
  selectedModel: any;
  string:string = "";
  models:any=[];
  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    private a: ServicesService,
    private fb:FormBuilder,
    private servicen: NotificationsService
    ) {}

    
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

    StateForm = this.fb.group({
      name: '',
      model: [''],
    });
    

    onSubmit() {
      console.log("state: ", this.StateForm.value.model )
      let exist: boolean = false;

     
       let formAction={
          name: this.StateForm.value.name,
          model: this.StateForm.value.model,
        }
      console.log("model : ",formAction)
      let newObject:any = {}
       for (let i=0; i < JSON.parse(localStorage.getItem('Models') || '{}').length; i++) {
         if(formAction.model != null){
         for(let j=0; j < formAction.model.length; j++){
          if ( JSON.parse(localStorage.getItem('Models') || '{}')[i].name == formAction.model[j]) {
            this.string += JSON.parse(localStorage.getItem('Models') || '{}')[i].string+"\n"
         }}
         }
  }
  if(JSON.parse(localStorage.getItem('States') || '{}').length>0){
    for(let i=0 ; i < JSON.parse(localStorage.getItem('States') || '{}').length ; i++){
      if(formAction.name == JSON.parse(localStorage.getItem('States') || '{}')[i].name){
        exist = true;
        this.onFailed("State Of Name: ( "+formAction.name+" ) Is Already Existe");
      }
    }
  }
  if(!exist){
    if(formAction.name != null && formAction.name != ""){
      this.a.addItemToLocalStorage({name: this.StateForm.value.name,string: this.string , id: Math.random() },'States',exist)
      this.a.changeData('States',this.a.dataState)
      this.onSuccess("Model Of Name: ( "+formAction.name+" ) Is Added");
    }else{
     this.servicen.warn('Alert',"You Have To Enter The Name Of The State",this.override);
    }
  }

 data.push({
    nameState:this.StateForm.value.nameState,
    data:this.print.printObj(newObject)
  })
  this.string="";
 
  let stateObject:any = {};
//   for (let i=0; i < formAction.length; i++) {
//     if (formAction[i] !== undefined) {
//       stateObject[formAction[i].name] = 'null';
//     }
 
// }

this.a.addItemToLocalStorage(this.StateForm.value.nameState +" = "+ this.print.printState(stateObject)+"\n",'InitialState',false)
this.a.changeData('InitialState',this.a.dataInitialState)
this.StateForm.reset();
  }
  close(): void {
  this.dialogRef.close();
  }
  ngOnInit(): void {
    this.a.currentModels.subscribe(value => {
      for(let i=0; i<value.length;i++){
        this.models.push(value[i])
      }
    })
  }
}
