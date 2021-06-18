import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor() { }
  dataS = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('Actions') || '{}'));
  currentData = this.dataS.asObservable();

  dataState = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('States') || '{}'));
  currentDataState = this.dataState.asObservable();


  dataReducer = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('Reducers') || '{}'));
  currentSDataReducer = this.dataReducer.asObservable();

  dataSelector = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('Selectors') || '{}'));
  currentSelector = this.dataSelector.asObservable();

  dataModels = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('Models') || '{}'));
  currentModels = this.dataModels.asObservable();

  dataInitialState = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('InitialState') || '{}'));
  currentInitialState= this.dataInitialState.asObservable();



  changeData(key: string , data:  BehaviorSubject<any> ){
    data.next(JSON.parse(localStorage.getItem(key) || '{}'));
  }
  addItemToLocalStorage(item: any , key: string , exist: boolean){
    if(!exist){
    let items = [];
    if(localStorage.getItem(key)){
      items = JSON.parse(localStorage.getItem(key) || '{}');
      items = [item, ...items];
    }else{
      items = [item]
    }
    localStorage.setItem(key, JSON.stringify(items));}
  };

  deleteItem(item: any , key: string ,data:  BehaviorSubject<any>){
    let a = JSON.parse(localStorage.getItem(key) || '{}');
    if(a.length>0){
      for(let i =0 ; i<a.length;i++){
        if(a[i].id == item){
          a.splice(i,1);
        }
      }
    }
    localStorage.setItem(key, JSON.stringify(a));
    this.changeData(key , data)
  }


}
