import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('./rooms/rooms.module').then((m) => m.RoomsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },

      {
        path: 'ads',
        loadChildren: () => import('./ads/ads.module').then((m) => m.AdsModule),
      },
      {
        path: 'facilities',
        loadChildren: () =>
          import('./facilities/facilities.module').then(
            (m) => m.FacilitiesModule
          ),
      },
      { path: 'profile/:id', component: ProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'booking-facilities',
        loadChildren: () =>
          import('./booking-facilities/booking-facilities.module').then(
            (m) => m.BookingFacilitiesModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/dashboard/home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
