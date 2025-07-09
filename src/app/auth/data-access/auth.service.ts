import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConf, getApiUrl } from '../../config/apiConfig';
import ApiResponse from '../../models/ApiResponse';
import { Observable } from 'rxjs'; // Importa Observable si no lo tienes

export interface RegisterReq {
  email: string;
  username: string;
  password: string;
  biography: string | undefined | null;
  profilePicture: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(bodyRequest: LoginReq) {
    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.auth.login()),
      bodyRequest,
      { withCredentials: true }
    );
  }

  signUp(bodyRequest: RegisterReq) {
    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.accounts.register()),
      bodyRequest
    );
  }

  logOut() {
    return this.http.post<ApiResponse<string>>(
      getApiUrl(apiConf.endpoints.auth.logout()),
      {},
      {
        withCredentials: true,
      }
    );
  }
}
