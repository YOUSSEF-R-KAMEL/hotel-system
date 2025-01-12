import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { ExploreComponent } from './components/explore/explore.component';
import { FavRoomsComponent } from './components/fav-rooms/fav-rooms.component';
import { LoginRegisterDialogComponent } from './home/components/login-register-dialog/login-register-dialog.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    ExploreComponent,
    LoginRegisterDialogComponent,
    FavRoomsComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, NgxPaginationModule],
})
export class UserModule {}
