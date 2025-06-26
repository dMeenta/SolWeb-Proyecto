import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';
import { Observable } from 'rxjs';

interface CommunityRequest {
  userId: string;
  gameId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  joinCommunity(uid: string, gameId: number): Observable<ApiResponse<any>> {
    const body: CommunityRequest = { userId: uid, gameId: gameId };

    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.community.joinCommunity()),
      body
    );
  }

  leaveCommunity(uid: string, gameId: number): Observable<ApiResponse<any>> {
    const body: CommunityRequest = { userId: uid, gameId: gameId };

    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.community.leaveCommunity()),
      body
    );
  }

  getCommunitiesByUser(offset = 0, limit = 10): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      getApiUrl(
        apiConf.endpoints.community.currentUserCommunities(offset, limit)
      ),
      { withCredentials: true }
    );
  }

  /* @DEPRECATED *********
  ************************
  checkMembership(uid: string, gameId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.community.isMember(uid, gameId))
    );
  } */
}
