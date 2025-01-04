import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { HelperService } from '../../../shared/services/helpers/helper.service';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const platform = inject(HelperService);
  const baseUrl = 'https://upskilling-egypt.com:3000/api/v0/';
  const isBrowser = platform.isPlatformBrowser();
  let token: string | null = '';
  if (isBrowser) {
    token = localStorage.getItem('token');
  }
  const newRequest = req.clone({
    url: req.url.includes('assets') ? req.url : baseUrl + req.url,
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return next(newRequest);
};
