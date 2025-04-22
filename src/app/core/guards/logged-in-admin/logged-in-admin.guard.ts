import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../../../shared/services/helpers/helper.service';

export const loggedInAdminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const helperService = inject(HelperService);
  let token: string | null = null;
  if (helperService.isPlatformBrowser()) {
    token = localStorage.getItem('token');
  }
  if (token) {
    _Router.navigate(['/admin/dashboard']);
    return false;
  } else {
    return true;
  }
};
