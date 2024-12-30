import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { UpdateAdComponent } from './components/update-ad/update-ad.component';
import { ViewAdComponent } from './components/view-ad/view-ad.component';

@NgModule({
  declarations: [AdsComponent, AddAdComponent, UpdateAdComponent, ViewAdComponent],
  imports: [CommonModule, AdsRoutingModule, SharedModule],
})
export class AdsModule {}
