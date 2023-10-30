import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {EquipmentDialogComponent} from "./equipment/equipment.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ListPointComponent} from "./list-point/list-point.component";
import {PointDialogComponent} from "./point/point.component";



@NgModule({
  declarations: [
    HomeComponent,
    EquipmentDialogComponent,
    ListPointComponent,
    PointDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
