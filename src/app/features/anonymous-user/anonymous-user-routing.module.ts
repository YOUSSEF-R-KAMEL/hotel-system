import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousUserComponent } from './anonymous-user.component';

const routes: Routes = [{ path: '', component: AnonymousUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonymousUserRoutingModule { }
