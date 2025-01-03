import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedRoomsComponent } from './shared-rooms/shared-rooms.component';


@NgModule({
  declarations: [
    UserComponent,
    SharedRoomsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
