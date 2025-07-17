import { Injectable } from '@angular/core';
import { apiConf, getApiUrl } from '../../config/apiConfig';
import { HttpClient } from '@angular/common/http';
import { UserMSQL } from '../../models/UserMSQL';
import ApiResponse from '../../models/ApiResponse';
import { catchError, map, Observable, of } from 'rxjs';
import { Friend } from '../../components/friend-list-object/friend-list-object.component';
import PaginatedResponse from '../../models/PaginatedResponse';

export interface UserMinimal {
  username: string;
  profilePicture: string;
  friendshipStatus: FriendshipStatus;
}

export enum FriendshipStatus {
  NONE = 'NONE',
  PENDING_RECEIVED = 'PENDING_RECEIVED',
  PENDING_SENT = 'PENDING_SENT',
  FRIENDS = 'FRIENDS',
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  getProfile(username: string): Observable<ApiResponse<UserMSQL>> {
    return this.http.get<ApiResponse<UserMSQL>>(
      getApiUrl(apiConf.endpoints.user.getProfile(username))
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.http
      .get<ApiResponse<any>>(
        getApiUrl(apiConf.endpoints.user.getCurrentUserLogged()),
        { withCredentials: true }
      )
      .pipe(
        map(() => true), // si responde correctamente, está logueado
        catchError(() => of(false)) // si hay error, no está logueado
      );
  }

  getFriendsList(
    offset = 0,
    limit = 8
  ): Observable<ApiResponse<PaginatedResponse<Friend>>> {
    return this.http.get<ApiResponse<PaginatedResponse<Friend>>>(
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

  getAllNotFriends(
    offset = 0,
    limit = 10
  ): Observable<ApiResponse<PaginatedResponse<UserMinimal>>> {
    return this.http.get<ApiResponse<PaginatedResponse<UserMinimal>>>(
      getApiUrl(apiConf.endpoints.user.listAllNotFriends(offset, limit)),
      { withCredentials: true }
    );
  }

  searchUsersByUsername(
    username: string,
    offset: number,
    limit: number
  ): Observable<ApiResponse<PaginatedResponse<UserMinimal>>> {
    return this.http.get<ApiResponse<PaginatedResponse<UserMinimal>>>(
      getApiUrl(
        apiConf.endpoints.user.searchUsersByUsername(username, offset, limit)
      ),
      { withCredentials: true }
    );
  }

  searchUserInFriendsList(
    username: string,
    offset = 0,
    limit = 8
  ): Observable<ApiResponse<PaginatedResponse<Friend>>> {
    return this.http.get<ApiResponse<PaginatedResponse<Friend>>>(
      getApiUrl(
        apiConf.endpoints.user.searchUserInFriendsList(username, offset, limit)
      ),
      { withCredentials: true }
    );
  }

  getFriendshipRequests(
    offset = 0,
    limit = 5
  ): Observable<ApiResponse<PaginatedResponse<UserMinimal>>> {
    return this.http.get<ApiResponse<PaginatedResponse<UserMinimal>>>(
      getApiUrl(apiConf.endpoints.user.friendShipRequests(offset, limit)),
      { withCredentials: true }
    );
  }

  getFriendsListByUser(
    username: string,
    offset = 0,
    limit = 10
  ): Observable<ApiResponse<PaginatedResponse<UserMinimal>>> {
    return this.http.get<ApiResponse<PaginatedResponse<UserMinimal>>>(
      getApiUrl(
        apiConf.endpoints.user.getFriendsListByUser(username, offset, limit)
      ),
      { withCredentials: true }
    );
  }
}
