import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';
import PaginatedResponse from '../models/PaginatedResponse';

export interface Commentary {
  id: string;
  postId: string;
  commenterUsername: string;
  commenterProfilePicture: string;
  commentContent: string;
  likes: string[];
  commentedAt: number;
}

export interface CommentaryDTO {
  id: string;
  postId: string;
  commenterUsername: string;
  commenterProfilePicture: string;
  commentContent: string;
  likes: string[];
  currentUserLikedIt: boolean;
  commentedAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  create(
    postId: string,
    commentContent: string
  ): Observable<ApiResponse<Commentary>> {
    return this.http.post<ApiResponse<Commentary>>(
      getApiUrl(apiConf.endpoints.comments.create()),
      { postId, commentContent },
      { withCredentials: true }
    );
  }

  findByPostId(
    postId: string,
    offset = 0,
    limit = 5
  ): Observable<ApiResponse<PaginatedResponse<CommentaryDTO>>> {
    return this.http.get<ApiResponse<PaginatedResponse<CommentaryDTO>>>(
      getApiUrl(apiConf.endpoints.comments.findByPostId(postId, offset, limit)),
      { withCredentials: true }
    );
  }

  toggleLike(commentId: string): Observable<ApiResponse<Commentary>> {
    return this.http.patch<ApiResponse<Commentary>>(
      getApiUrl(apiConf.endpoints.comments.toggleLike(commentId)),
      {},
      { withCredentials: true }
    );
  }
}
