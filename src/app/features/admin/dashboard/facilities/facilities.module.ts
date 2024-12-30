import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilitiesRoutingModule } from './facilities-routing.module';
import { FacilitiesComponent } from './facilities.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddEditViewDialogComponent } from './components/add-edit-view-dialog/add-edit-view-dialog.component';


@NgModule({
  declarations: [
    FacilitiesComponent,
    AddEditViewDialogComponent
  ],
  imports: [
    CommonModule,
    FacilitiesRoutingModule,
    SharedModule
  ]
})
export class FacilitiesModule { }
