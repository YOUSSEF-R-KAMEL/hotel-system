import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsListRoutingModule } from './ads-list-routing.module';
import { AdsListComponent } from './ads-list.component';


@NgModule({
  declarations: [
    AdsListComponent
  ],
  imports: [
    CommonModule,
    AdsListRoutingModule
  ]
})
export class AdsListModule { }
