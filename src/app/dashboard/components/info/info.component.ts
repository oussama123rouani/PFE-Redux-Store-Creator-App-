import { Component, Injectable, OnInit } from '@angular/core';
import {ServicesService} from '../services.service'
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class InfoComponent implements OnInit {
  constructor(private data:ServicesService,
  ) {  }
   datas:any=[];
   dataSource1 :any=[];
   dataSource2 :any=[];
   dataSource3 :any=[];
   dataSource4 :any=[];
   openAction: boolean=false;
   openSelector: boolean=false;
   openReducer: boolean=false;
   openState: boolean=false;
   openModels: boolean=false;
   ngOnInit(){
    this.data.currentData.subscribe(value => {
      if(JSON.parse(localStorage.getItem('Actions') || '{}').length>0){
        this.openAction = true;
        this.datas=value
      }else{this.datas=[{
        type:"no data",
        payload:"no data"
      }];
    this.openAction=false}
    })

    this.data.currentDataState.subscribe(value => {
      if(JSON.parse(localStorage.getItem('States') || '{}').length>0){
        this.openState = true;
          this.dataSource1 = value;
      }else{
        this.openState=false;
        this.dataSource1=[{
          string:"no data"
        }
      ];
      }
    })

    this.data.currentSDataReducer.subscribe(value => {
      if(JSON.parse(localStorage.getItem('Reducers') || '{}').length>0){   
          this.dataSource2 = value;
          this.openReducer = true;
      }else{this.dataSource2=[{
        state:"no data",
        ac:"no data"
      }];
      this.openReducer = false;}
    })

    this.data.currentSelector.subscribe(value => {
      if(JSON.parse(localStorage.getItem('Selectors') || '{}').length>0){
          this.dataSource3 = value; 
      }else{this.dataSource3=[{
        name:"no data",
        state:"no data"
      }]}
    })

    this.data.currentModels.subscribe(value => {
      if(JSON.parse(localStorage.getItem('Models') || '{}').length>0){
          this.dataSource4 = value; 
          this.openModels = true;
      }else{this.dataSource4=[{string:"no data"}];
      this.openModels = false;}
    })
    }
   
  delete(i:any,id:string){
    switch (id) {
      case "action":
        this.data.deleteItem(i,"Actions",this.data.dataS)
        break;
      case "state":
        this.data.deleteItem(i,"States",this.data.dataState)
        break;
      case "reducer":
        this.data.deleteItem(i,"Reducers",this.data.dataReducer)
        break;
      case "model":
        this.data.deleteItem(i,"Models",this.data.dataModels)
        break;
    }

  }

}
 
 

