import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private http: HttpClient) {}

  sendFriendRequest(receiverUsername: string) {
    return this.http.post<ApiResponse<string>>(
      getApiUrl(apiConf.endpoints.social.friendRequest.send()),
      receiverUsername,
      { withCredentials: true }
    );
  }

  cancelFriendRequest(cancelledUsername: string) {
    return this.http.post<ApiResponse<string>>(
      getApiUrl(apiConf.endpoints.social.friendRequest.cancel()),
      cancelledUsername,
      { withCredentials: true }
    );
  }

  acceptFriendRequest(acceptedUsername: string) {
    return this.http.post<ApiResponse<string>>(
      getApiUrl(apiConf.endpoints.social.friendRequest.accept()),
      acceptedUsername,
      { withCredentials: true }
    );
  }
  rejectFriendRequest(rejectedUsername: string) {
    return this.http.post<ApiResponse<string>>(
      getApiUrl(apiConf.endpoints.social.friendRequest.reject()),
      rejectedUsername,
      { withCredentials: true }
    );
  }
}
