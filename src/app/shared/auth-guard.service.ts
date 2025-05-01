import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private _sharedService: SharedService, private router: Router) {}

  // Verifica si el usuario está logueado
  isUserLogged(): boolean {
    return this._sharedService.getUserLogged() !== null;
  }

  redirectIfNotLogged(): boolean {
    if (!this.isUserLogged()) {
      this.router.navigateByUrl('/auth/sign-in');
      return false;
    }
    return true;
  }

  // Redirige si el usuario ya está logueado
  redirectIfLogged(): boolean {
    if (this.isUserLogged()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
