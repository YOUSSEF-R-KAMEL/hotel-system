import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://upskilling-egypt.com:3000/api/v0/';

  const token = localStorage.getItem('token');
  let newRequest;
  if (token) {
    newRequest = req.clone({
      url: baseUrl + req.url,
      setHeaders: { Authorization: `${token}` },
    });
  } else {
    newRequest = req.clone({
      url: baseUrl + req.url,
    });
  }
  return next(newRequest);
};
