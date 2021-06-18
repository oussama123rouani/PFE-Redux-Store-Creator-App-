import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { ServicesService } from '../services.service';
export let stringSelector = "";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})

export class SelectorComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<SelectorComponent>,
    private a: ServicesService
    ) {}

    states:any =[];
  
    selectedState:any;

    onSubmit(myForm: NgForm) {
    let formSelector = {
        name : myForm.value.nameSelector,
        state : this.selectedState
      };
      this.a.addItemToLocalStorage(formSelector,'Selectors',false)
      this.a.changeData('Selectors',this.a.dataSelector)
      stringSelector = "function getAllState(state){\n"+
                        " return state;\n"+
                        "};"
  }
  close(): void {
  this.dialogRef.close();
  }
  ngOnInit(): void {
    this.a.currentDataState.subscribe(value => {
      for(let i=0; i<value.length;i++){
        this.states.push(value[i].name)
      }
    })
  }
}
