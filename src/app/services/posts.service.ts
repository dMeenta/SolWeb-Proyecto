import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getApiUrl, apiConf } from '../config/apiConfig';
import ApiResponse from '../models/ApiResponse';
import {
  Post,
  PostDTO,
} from '../routing/community-page/community-page.component';
import PaginatedResponse from '../models/PaginatedResponse';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(gameName: string, postContent: string): Observable<ApiResponse<Post>> {
    return this.http.post<ApiResponse<Post>>(
      getApiUrl(apiConf.endpoints.posts.create()),
      { gameName, postContent },
      { withCredentials: true }
    );
  }

  findByCommunityName(
    gameName: string,
    offset = 0,
    limit = 5
  ): Observable<ApiResponse<PaginatedResponse<PostDTO>>> {
    return this.http.get<ApiResponse<PaginatedResponse<PostDTO>>>(
      getApiUrl(
        apiConf.endpoints.posts.findByCommunityName(gameName, offset, limit)
      ),
      { withCredentials: true }
    );
  }

  toggleLike(postId: string): Observable<ApiResponse<Post>> {
    return this.http.patch<ApiResponse<Post>>(
      getApiUrl(apiConf.endpoints.posts.toggleLike(postId)),
      {},
      { withCredentials: true }
    );
  }

  getUserFeed(
    offset = 0,
    limit = 5
  ): Observable<ApiResponse<PaginatedResponse<PostDTO>>> {
    return this.http.get<ApiResponse<PaginatedResponse<PostDTO>>>(
      getApiUrl(apiConf.endpoints.posts.getUserFeed(offset, limit)),
      { withCredentials: true }
    );
  }
}
