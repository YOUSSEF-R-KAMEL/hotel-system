import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { AddUpdateAdComponent } from './components/add-update-ad/add-update-ad.component';

@NgModule({
  declarations: [AdsComponent, AddUpdateAdComponent],
  imports: [CommonModule, AdsRoutingModule, SharedModule],
})
export class AdsModule {}
