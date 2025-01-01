import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { AddViewEditRoomComponent } from './components/add-new-room/add-new-room.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';


@NgModule({
  declarations: [
    RoomsComponent,
    AddViewEditRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule,
  ]
})
export class RoomsModule { }
