import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { UserComponent } from './user.component';
import { ExploreComponent } from './components/explore/explore.component';
import { exploreRoomWithFiltersResolver } from './resolvers/explore-room-with-filters.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'explore',
        component: ExploreComponent,
        resolve: {filters: exploreRoomWithFiltersResolver}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
