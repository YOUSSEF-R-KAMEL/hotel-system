import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userGuard } from '../../core/guards/user/user.guard';
import { ExploreComponent } from './components/explore/explore.component';
import { FavRoomsComponent } from './components/fav-rooms/fav-rooms.component';
import { exploreRoomWithFiltersResolver } from './resolvers/explore-room-with-filters.resolver';
import { favoriteRoomsResolver } from './resolvers/favorite-rooms.resolver';
import { UserComponent } from './user.component';
import { RoomDetailsComponent } from './home/components/room-details/room-details.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: "home/:id",
        component: RoomDetailsComponent
      },
      {
        path: 'explore',
        component: ExploreComponent,
        resolve: { filters: exploreRoomWithFiltersResolver },
      },
      {
        path: 'favorites',
        component: FavRoomsComponent,
        canActivate: [userGuard],
        resolve: { filters: favoriteRoomsResolver },
      },
    ],
  },
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
