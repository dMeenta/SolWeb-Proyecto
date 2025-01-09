import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../shared/auth-state.service';
import { map } from 'rxjs';

export function privateGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
    return authState.authState$.pipe(
      map((state) => {
        if (!state) {
          router.navigateByUrl('auth/sign-up');
          return false;
        }
        return true;
      })
    );
  };
}
