import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const _Router = inject(Router);
  if (token !== null && role == 'admin') {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false;
  }
};
