import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function privateGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const user = localStorage.getItem('userLogged');

    if (!user) {
      router.navigateByUrl('/auth/sign-in');
      return false;
    }

    return true;
  };
}

export function publicGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const user = localStorage.getItem('userLogged');

    if (user) {
      router.navigateByUrl('/');
      return false;
    }
    return true;
  };
}
