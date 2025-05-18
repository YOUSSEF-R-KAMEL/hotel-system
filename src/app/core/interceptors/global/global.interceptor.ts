import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../features/auth/services/auth.service';
import { HelperService } from '../../../shared/services/helpers/helper.service';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const helper = inject(HelperService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  const baseUrl = 'https://upskilling-egypt.com:3000/api/v0';
  const isBrowser = helper.isPlatformBrowser();
  const token = isBrowser ? localStorage.getItem('token') : '';

  // Only intercept and rewrite internal (relative) URLs
  const isRelativeUrl = !req.url.startsWith('http') && !req.url.startsWith('/assets/');

  const newReq = isRelativeUrl
    ? req.clone({
        url: `${baseUrl}/${req.url}`,
        setHeaders: {
          Authorization: token || '',
        },
      })
    : req;

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token is invalid or expired
        authService.onLogout();
        router.navigate(['/auth']);
        toastr.error('Your session has expired. Please log in again.');
      }
      return throwError(() => error);
    })
  );
};

