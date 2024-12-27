import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedUserRoutingModule } from './logged-user-routing.module';
import { LoggedUserComponent } from './logged-user.component';


@NgModule({
  declarations: [
    LoggedUserComponent
  ],
  imports: [
    CommonModule,
    LoggedUserRoutingModule
  ]
})
export class LoggedUserModule { }
