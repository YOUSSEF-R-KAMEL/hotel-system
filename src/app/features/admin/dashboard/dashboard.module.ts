import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
<<<<<<< HEAD
import { ChangePasswordComponent } from './components/change-password/change-password.component';
=======
import { ProfileComponent } from './components/profile/profile.component';
>>>>>>> 291263712edd907fd318ef21073c50102ba08f25
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideNavbarComponent,
    HomeComponent,
<<<<<<< HEAD
    ChangePasswordComponent,
=======
    ProfileComponent,
>>>>>>> 291263712edd907fd318ef21073c50102ba08f25
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, NgChartsModule],
})
export class DashboardModule {}
