import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConf, getApiUrl } from '../config/apiConfig';
import ApiResponse from '../models/ApiResponse';
import { Observable } from 'rxjs';

export enum ROLE {
  USER,
  ADMIN,
}

export type MinimalUserInfo = {
  username: string;
  profilePicture: string;
  role: ROLE;
  joinedCommunities: [];
  friendsList: [];
};

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  getUserLogged(): Observable<ApiResponse<MinimalUserInfo>> {
    return this.http.get<ApiResponse<MinimalUserInfo>>(
      getApiUrl(apiConf.endpoints.user.getCurrentUserLogged()),
      { withCredentials: true } // 👈 se enviará automáticamente la cookie
    );
  }

  isCommunityMember(gameName: string): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(
      getApiUrl(apiConf.endpoints.community.checkMembership(gameName)),
      { withCredentials: true }
    );
  }
}
