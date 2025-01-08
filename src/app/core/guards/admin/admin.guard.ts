import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../../../shared/services/helpers/helper.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const helperService = inject(HelperService)
  if (helperService.isPlatformBrowser()) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token !== null && role == 'admin') {
      return true;
    } else {
      _Router.navigate(['/auth']);
      return false;
    }
  }
  return false;
};
