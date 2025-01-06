import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ExploreComponent } from './components/explore/explore.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomeModule } from './home/home.module';
import { RoomDetailsComponent } from './home/components/room-details/room-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UserComponent, ExploreComponent, RoomDetailsComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, HomeModule, NgxPaginationModule],
})
export class UserModule {}
