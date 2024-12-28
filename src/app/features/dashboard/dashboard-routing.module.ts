import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin/admin.guard';

const routes: Routes = [{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, { path: 'anonymous-user', loadChildren: () => import('./anonymous-user/anonymous-user.module').then(m => m.AnonymousUserModule) }, { path: 'logged-user', loadChildren: () => import('./logged-user/logged-user.module').then(m => m.LoggedUserModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
