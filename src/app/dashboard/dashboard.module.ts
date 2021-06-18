import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table' ;

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatDialogModule} from '@angular/material/dialog';

import {MatInputModule} from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ReducerComponent } from './components/reducer/reducer.component';
import { SelectorComponent } from './components/selector/selector.component';
import { ModelsComponent } from './components/models/models.component';
import { EffectComponent } from './components/effect/effect.component';
import {SimpleNotificationsModule} from 'angular2-notifications';




@NgModule({
  declarations: [
    WrapperComponent,
    DasboardComponent,
    InfoComponent,
    UserComponent,
    ReducerComponent,
    SelectorComponent,
    ModelsComponent,
    EffectComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    SimpleNotificationsModule.forRoot(),

  ]
})
export class DashboardModule { }
