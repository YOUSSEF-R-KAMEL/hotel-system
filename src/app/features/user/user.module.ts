import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ExploreComponent } from './components/explore/explore.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, ExploreComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
