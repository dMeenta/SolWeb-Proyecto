import { Injectable } from '@angular/core';
import { apiConf, getApiUrl } from '../../config/apiConfig';
import { HttpClient } from '@angular/common/http';
import { UserMSQL } from '../../models/UserMSQL';
import ApiResponse from '../../models/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  createUser(userToSend: UserMSQL): Observable<ApiResponse<UserMSQL>> {
    return this.http.post<ApiResponse<UserMSQL>>(
      getApiUrl(apiConf.endpoints.users.create),
      userToSend
    );
  }

  getProfile(uid: string): Observable<ApiResponse<UserMSQL>> {
    return this.http.get<ApiResponse<UserMSQL>>(
      getApiUrl(apiConf.endpoints.users.profile(uid))
    );
  }
}
