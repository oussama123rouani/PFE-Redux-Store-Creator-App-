import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { ServicesService } from '../services.service';
import { Tool } from '../tools/tool';
import { NotificationsService } from 'angular2-notifications';

export const ELEMENT_DATA4:any = [];

 const data:any = [];
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})

export class ModelsComponent implements OnInit {
  print: Tool = new Tool();

  
 
  constructor(
    public dialogRef: MatDialogRef<ModelsComponent>,
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


    ModelForm = this.fb.group({
      nameModel: '',
      inputes: this.fb.array([]) ,
    });


    inputes() : FormArray {
      return this.ModelForm.get("inputes") as FormArray
    }
     
    newInput(): FormGroup {
      return this.fb.group({
        name: '',
        type: '',
      })
    }
     
    addInput() {
      this.inputes().push(this.newInput());
    }
     
    removeInput(i:number) {
      this.inputes().removeAt(i);
    }
       
    onSubmit() {
      let exist: boolean = false;
      let formAction=[{
           name:"",
          type:""
         }];  

      for(let i = 0 ; i < this.ModelForm.value.inputes.length ; i++){
        formAction[i]={
          name: this.ModelForm.value.inputes[i].name,
          type: this.ModelForm.value.inputes[i].type,
        }
      }
      let newObject:any = {}
      for (let i=0; i < formAction.length; i++) {
      if (formAction[i] !== undefined) {
          newObject[formAction[i].name] = formAction[i].type
      }
   
  }


 

  if(JSON.parse(localStorage.getItem('Models') || '{}').length>0){   
    for(let i =0 ; i<JSON.parse(localStorage.getItem('Models') || '{}').length;i++){
        if( JSON.parse(localStorage.getItem('Models') || '{}')[i].name == this.ModelForm.value.nameModel){
          exist = true;
          this.onFailed("Model Of Name: ( "+this.ModelForm.value.nameModel+" ) Is Already Existe");
        }
    }
  }
  

  if(!exist){
    if(this.ModelForm.value.nameModel != null && this.ModelForm.value.nameModel != ""){
      this.a.addItemToLocalStorage({id: Math.random() , name: this.ModelForm.value.nameModel , string: this.ModelForm.value.nameModel+" : "+ this.print.printObj(newObject)} ,"Models",exist)
      this.a.changeData("Models",this.a.dataModels)
      this.onSuccess("Model Of Name: ( "+this.ModelForm.value.nameModel+" ) Is Added");
    }else{
     this.servicen.warn('Alert',"You Have To Enter The Name Of The Model",this.override);
    }
    }
  
 

  this.inputes().clear();
  this.ModelForm.reset();
  
  }

  close(): void {
  this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
