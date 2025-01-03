import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedRoomsComponent } from './shared-rooms/shared-rooms.component';
import { SingleRoomComponent } from './shared-rooms/single-room/single-room.component';

@NgModule({
  declarations: [
    UserComponent,
    SharedRoomsComponent,
    SingleRoomComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
