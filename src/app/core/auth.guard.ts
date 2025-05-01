import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthGuardService } from '../shared/auth-guard.service';

export function privateGuard(): CanActivateFn {
  return () => {
    const _authGuardService = inject(AuthGuardService);
    return _authGuardService.redirectIfNotLogged();
  };
}

export function publicGuard(): CanActivateFn {
  return () => {
    const _authGuardService = inject(AuthGuardService);
    return _authGuardService.redirectIfLogged();
  };
}
