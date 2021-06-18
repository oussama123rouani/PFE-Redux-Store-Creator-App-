import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import {ServicesService} from '../services.service'

@Component({
  selector: 'app-reducer',
  templateUrl: './reducer.component.html',
  styleUrls: ['./reducer.component.css']
})

export class ReducerComponent implements OnInit {
  actions:any =[];
  states:any =[];
  constructor(
    public dialogRef: MatDialogRef<ReducerComponent>,
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

    ReducerForm = this.fb.group({
      state: [''],
      action: [''],
    });
    
    
    ngOnInit(): void {

      this.a.currentData.subscribe(value => {
        for(let i=0; i<value.length;i++){
          this.actions.push(value[i])
        }
      })

      this.a.currentDataState.subscribe(value => {
        for(let i=0; i<value.length;i++){
          this.states.push(value[i])
        }
      })

    }

    onSubmit() {
      let exist: boolean = false;
      let formReducer:any = {
        id: Math.random(),
        state : this.ReducerForm.value.state,
        ac : this.ReducerForm.value.action
      };

      if(JSON.parse(localStorage.getItem('Reducers') || '{}').length){
        for(let i=0;i<JSON.parse(localStorage.getItem('Reducers') || '{}').length;i++){
          if(formReducer.state == JSON.parse(localStorage.getItem('Reducers') || '{}')[i].state){
            exist = true;
            this.onFailed("You Already Have A Reducer With State: ( "+formReducer.state+" )" );
          }
        }
      }

      if(!exist){
        if(formReducer.state != null && formReducer.state != ""){
          this.a.addItemToLocalStorage(formReducer,'Reducers',exist)
          this.a.changeData('Reducers',this.a.dataReducer)
          this.onSuccess("Reducer With State: ( "+formReducer.state+" ) Is Added");
        }else{
         this.servicen.warn('Alert',"You Have To Select A State",this.override);
        }
      }
    this.ReducerForm.reset()
  } 
  close(): void {
  this.dialogRef.close();
  }
}
