import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnonymousUserRoutingModule } from './anonymous-user-routing.module';
import { AnonymousUserComponent } from './anonymous-user.component';


@NgModule({
  declarations: [
    AnonymousUserComponent
  ],
  imports: [
    CommonModule,
    AnonymousUserRoutingModule
  ]
})
export class AnonymousUserModule { }
