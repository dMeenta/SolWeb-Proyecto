import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, finalize } from 'rxjs';
import { getApiUrl, apiConf } from '../config/apiConfig';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private hasCheckedSessionOnce = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  redirectIfNotLogged(): Observable<boolean> {
    if (!this.hasCheckedSessionOnce) {
      this.loadingService.show();
    }

    this.loadingService.show();
    return this.http
      .get(getApiUrl(apiConf.endpoints.user.getCurrentUserLogged()), {
        withCredentials: true,
      })
      .pipe(
        map(() => {
          this.hasCheckedSessionOnce = true;
          return true;
        }),
        catchError(() => {
          this.hasCheckedSessionOnce = true;
          this.router.navigateByUrl('/auth/sign-in');
          return of(false);
        }),
        finalize(() => this.loadingService.hide())
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
