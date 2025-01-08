import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../../../shared/services/helpers/helper.service';

export const userGuard: CanActivateFn = (route, state) => {
  const platform = inject(HelperService);
  let token: string | null = '';
  const role = localStorage.getItem('role');
  const isBrowser = platform.isPlatformBrowser();
  if (isBrowser) {
    token = localStorage.getItem('token');
  }
  const _Router = inject(Router);
  if (token !== null && role == 'user') {
    return true;
  } else {
    _Router.navigate(['/home']);
    return false;
  }
};
