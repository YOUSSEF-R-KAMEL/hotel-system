import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';

@NgModule({
  declarations: [AdsComponent],
  imports: [CommonModule, AdsRoutingModule, SharedModule],
})
export class AdsModule {}
