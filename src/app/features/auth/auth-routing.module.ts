import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestResetPasswordComponent } from './components/request-reset-password/request-reset-password.component';

const routes: Routes = [
  // { path: '', redirectTo: 'register', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'request-reset-password',
    component: RequestResetPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
