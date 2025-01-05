import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ExploreComponent } from './components/explore/explore.component';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, ExploreComponent, SingleRoomComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
  exports: [SingleRoomComponent],
})
export class UserModule {}
