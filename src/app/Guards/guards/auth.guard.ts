import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../../services/token-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenservics=inject(TokenServiceService);
  const router=inject(Router);
  const token=tokenservics.gettoken();
  return token ? true : router.parseUrl('/login');
};
