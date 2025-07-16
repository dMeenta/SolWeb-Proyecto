import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';
import { Observable } from 'rxjs';
import PaginatedResponse from '../models/PaginatedResponse';
import { UserCommunityDTO } from '../components/user-communities-bubbles/user-communities-bubbles.component';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  joinCommunity(gameName: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.community.joinCommunity()),
      gameName,
      { withCredentials: true }
    );
  }

  leaveCommunity(gameName: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      getApiUrl(apiConf.endpoints.community.leaveCommunity()),
      gameName,
      { withCredentials: true }
    );
  }

  getCommunitiesByUser(
    username: string,
    offset = 0,
    limit = 10
  ): Observable<ApiResponse<PaginatedResponse<UserCommunityDTO>>> {
    return this.http.get<ApiResponse<PaginatedResponse<UserCommunityDTO>>>(
      getApiUrl(
        apiConf.endpoints.community.getCommunitiesByUser(
          username,
          offset,
          limit
        )
      ),
      { withCredentials: true }
    );
  }

  getCurrentUserCommunities(
    offset = 0,
    limit = 10
  ): Observable<ApiResponse<PaginatedResponse<UserCommunityDTO>>> {
    return this.http.get<ApiResponse<PaginatedResponse<UserCommunityDTO>>>(
      getApiUrl(
        apiConf.endpoints.community.getCurrentUserCommunities(offset, limit)
      ),
      { withCredentials: true }
    );
  }
}
