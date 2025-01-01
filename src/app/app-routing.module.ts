import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin/admin.guard';
import { userGuard } from './core/guards/user/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    // canActivate: [loggedInAdminGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'anonymous-user',
    loadChildren: () =>
      import('./features/anonymous-user/anonymous-user.module').then(
        (m) => m.AnonymousUserModule
      ),
  },
  {
    path: 'logged-user',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./features/logged-user/logged-user.module').then(
        (m) => m.LoggedUserModule
      ),
  },
  { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
