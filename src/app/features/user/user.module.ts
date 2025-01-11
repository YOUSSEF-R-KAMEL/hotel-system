import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { ExploreComponent } from './components/explore/explore.component';
import { FavRoomsComponent } from './components/fav-rooms/fav-rooms.component';
import { LoginRegisterDialogComponent } from './home/components/login-register-dialog/login-register-dialog.component';
import { RoomDetailsComponent } from './home/components/room-details/room-details.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NgxStripeModule } from 'ngx-stripe';
const publicKey = 'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8';

@NgModule({
  declarations: [
    UserComponent,
    ExploreComponent,
    RoomDetailsComponent,
    LoginRegisterDialogComponent,
    FavRoomsComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, NgxPaginationModule, NgxStripeModule.forRoot(publicKey)],
})
export class UserModule {}
