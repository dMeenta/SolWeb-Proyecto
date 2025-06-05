import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { getApiUrl, apiConf } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private http: HttpClient, private router: Router) {}

  redirectIfNotLogged(): Observable<boolean> {
    return this.http
      .get(getApiUrl(apiConf.endpoints.user.getCurrentUserLogged()), {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError(() => {
          this.router.navigateByUrl('/auth/sign-in');
          return of(false);
        })
      );
  }

  redirectIfLogged(): Observable<boolean> {
    return this.http
      .get(getApiUrl(apiConf.endpoints.user.getCurrentUserLogged()), {
        withCredentials: true,
      })
      .pipe(
        map(() => {
          this.router.navigateByUrl('/');
          return false;
        }),
        catchError(() => of(true)) // si falla, significa que no está logueado → permitir acceso
      );
  }
}
