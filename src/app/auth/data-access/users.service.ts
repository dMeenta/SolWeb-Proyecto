import { Injectable } from '@angular/core';
import { apiConf, getApiUrl } from '../../config/apiConfig';
import { HttpClient } from '@angular/common/http';
import { UserMSQL } from '../../models/UserMSQL';
import ApiResponse from '../../models/ApiResponse';
import { catchError, map, Observable, of } from 'rxjs';
import { Friend } from '../../components/friend-list-object/friend-list-object.component';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getProfile(username: string): Observable<ApiResponse<UserMSQL>> {
    return this.http.get<ApiResponse<UserMSQL>>(
      getApiUrl(apiConf.endpoints.user.findByUsername(username))
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.http
      .get<ApiResponse<any>>(
        getApiUrl(apiConf.endpoints.user.getCurrentUserLogged()),
        { withCredentials: true }
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  getFriendsList(offset = 0, limit = 10): Observable<ApiResponse<Friend[]>> {
    return this.http.get<ApiResponse<Friend[]>>(
      getApiUrl(apiConf.endpoints.user.getFriendsList(offset, limit)),
      { withCredentials: true }
    );
  }

  getCurrentUser(): Observable<ApiResponse<UserMSQL>> {
    return this.http.get<ApiResponse<UserMSQL>>(
      getApiUrl(apiConf.endpoints.user.getCurrentUserLogged()),
      { withCredentials: true }
    );
  }
}
