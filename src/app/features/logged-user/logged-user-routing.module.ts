import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserComponent } from './logged-user.component';

const routes: Routes = [{ path: '', component: LoggedUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedUserRoutingModule { }
