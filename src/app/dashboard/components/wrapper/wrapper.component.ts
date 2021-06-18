import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DasboardComponent } from '../dasboard/dasboard.component';
import { UserComponent } from '../user/user.component';
import { ReducerComponent } from '../reducer/reducer.component';
import { SelectorComponent,stringSelector } from '../selector/selector.component';
import { ModelsComponent } from '../models/models.component';
import * as JSZip from 'jszip';  
import * as FileSaver from 'file-saver';
import {ServicesService} from '../services.service'
import { storeWriter } from '../tools/storeWriter';
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  imageSrc = "assets/images/redux-logo.png";
  isExpanded: boolean = false;  
  constructor(public dialog: MatDialog,private data:ServicesService) {}
  writer:storeWriter = new storeWriter();
  open(component: any){
    let dialogRef = this.dialog.open(component, {
      width: '500px',
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }
  openDialog(id:any): void {
    switch (id) {
      case "createAction":
      this.open(DasboardComponent)
      break;

      case "createState":
      this.open(UserComponent)
      break;

      case "createReducer":
      this.open(ReducerComponent)
      break;

      case "createSelector":
      this.open(SelectorComponent)
      break;

      case "createModels":
      this.open(ModelsComponent)
      break;
    }
  }
  defaultString ="function createAction(type,payload){\n"+
    "  return {\n"+
    "            type: type,\n"+
    "            payload: payload\n"+
    "         }\n"+
    "}\n";
    string: string="";
    stringReducer: string="";
  download(){
    this.string = this.writer.writeAction(this.string)
    this.stringReducer = this.writer.writeReducer(this.stringReducer)
    let zip = new JSZip();
    zip.file("action.js" , this.defaultString+this.string);
    zip.file("reducer.js" , this.writer.writeInitialState()+this.stringReducer)
    zip.file("selector.js" , stringSelector)
    zip.generateAsync({type:"blob"}).then(
      function(content) {
        FileSaver.saveAs(content,"store.zip");
      }
    )
    this.string="";
    this.stringReducer="";
  }
  ngOnInit(): void {
  }

}
