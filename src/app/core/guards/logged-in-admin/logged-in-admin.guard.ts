import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInAdminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const _Router = inject(Router);
  if (!token) {
    return true;
  } else {
    _Router.navigate(['/admin/dashboard']);
    return false;
  }
};
