import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';
import { Observable } from 'rxjs';

interface JoinCommunityRequest {
  userId: string;
  gameId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  joinCommunity(uid: string, gameId: number): Observable<ApiResponse<any>> {
    const body: JoinCommunityRequest = { userId: uid, gameId: gameId };

    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.community.joinCommunity),
      body
    );
  }
}
