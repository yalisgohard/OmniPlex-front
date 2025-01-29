import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = document.cookie.split(';').find((cookie) => cookie.includes('token'));
  let requestToSend = req;

  if (token) {
    const headers = req.headers.set('Authorization', 'Token ' + token.split('=')[1]);
    requestToSend = req.clone({ headers: headers });
  }

  
  return next(requestToSend);
};
