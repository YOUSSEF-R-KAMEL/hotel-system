import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddNewRoomComponent } from './components/add-new-room/add-new-room.component';


@NgModule({
  declarations: [
    RoomsComponent,
    AddNewRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule
  ]
})
export class RoomsModule { }
