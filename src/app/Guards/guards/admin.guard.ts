import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../../services/token-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenservics=inject(TokenServiceService);
  const router=inject(Router);
  const role=tokenservics.getRole();
  return role==='Admin' ? true : router.parseUrl('/notfound');
};
