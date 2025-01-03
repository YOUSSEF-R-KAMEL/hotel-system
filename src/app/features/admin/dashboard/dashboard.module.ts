import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../../../shared/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideNavbarComponent,
    HomeComponent,
    ChangePasswordComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, NgChartsModule],
})
export class DashboardModule { }
