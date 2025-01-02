import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddViewEditRoomComponent } from './components/add-new-room/add-new-room.component';
import { RoomsComponent } from './rooms.component';
import { roomResolver } from './resolver/room.resolver';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'add-new-room', component: AddViewEditRoomComponent },
  { path: 'view-room/:id', component: AddViewEditRoomComponent, resolve: { room: roomResolver } },
  { path: 'edit-room/:id', component: AddViewEditRoomComponent, resolve: { room: roomResolver } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
