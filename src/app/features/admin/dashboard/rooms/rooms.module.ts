import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddNewRoomComponent } from './components/add-new-room/add-new-room.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { UpdateRoomComponent } from './components/update-room/update-room.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoomsComponent,
    AddNewRoomComponent,
    ViewRoomComponent,
    UpdateRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule,
    NgxDropzoneModule,
    ReactiveFormsModule
  ]
})
export class RoomsModule { }
