import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService)
  return authservice.loggedUser
};
