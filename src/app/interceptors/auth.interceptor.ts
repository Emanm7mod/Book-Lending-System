import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenServiceService } from '../services/token-service.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenServiceService);
  const token = tokenService.gettoken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
