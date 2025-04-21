import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConf, getApiUrl } from '../../config/apiConfig';
import ApiResponse from '../../models/ApiResponse';
import { Observable } from 'rxjs'; // Importa Observable si no lo tienes

export interface BodyRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(bodyRequest: BodyRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.auth.login),
      bodyRequest
    );
  }

  signUp(bodyRequest: BodyRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.auth.register),
      bodyRequest
    );
  }

  logout(uid: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.auth.logout),
      { uid }
    );
  }

  deleteUser(uid: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.auth.delete(uid))
    );
  }
}
