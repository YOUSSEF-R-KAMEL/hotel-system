import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../../../shared/services/helpers/helper.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const helperService = inject(HelperService);
  if (isPlatformBrowser(helperService.isPlatformBrowser())) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return true;
    } else {
      _Router.navigate(['/auth']);
      return false;
    }
  }
  return false;
};
