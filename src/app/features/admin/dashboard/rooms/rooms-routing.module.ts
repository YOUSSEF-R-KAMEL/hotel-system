import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { AddNewRoomComponent } from './components/add-new-room/add-new-room.component';
import { UpdateRoomComponent } from './components/update-room/update-room.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'add-new-room', component: AddNewRoomComponent },
  { path: 'update-room/:id', component: UpdateRoomComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
