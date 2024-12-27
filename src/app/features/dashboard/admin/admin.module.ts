import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './dashboard/components/header/header.component';
import { HomeComponent } from './dashboard/components/home/home.component';
import { SideNavbarComponent } from './dashboard/components/side-navbar/side-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideNavbarComponent,
    HomeComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
