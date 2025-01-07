import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { ExploreComponent } from './components/explore/explore.component';
import { LoginRegisterDialogComponent } from './components/login-register-dialog/login-register-dialog.component';
import { RoomDetailsComponent } from './home/components/room-details/room-details.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    ExploreComponent,
    RoomDetailsComponent,
    LoginRegisterDialogComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, NgxPaginationModule],
})
export class UserModule {}
