import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const _Router = inject(Router);
  if (token !== null) {
    return true;
  } else {
    _Router.navigate(['/auth/']);
    return false;
  }
};
