import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { AddNewRoomComponent } from './components/add-new-room/add-new-room.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'add-new-room', component: AddNewRoomComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
