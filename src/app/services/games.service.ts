import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return new Observable((observer) => {
      this.http
        .get<ApiResponse<Game[]>>(getApiUrl(apiConf.endpoints.game.listAll()))
        .subscribe({
          next: (response) => observer.next(response.data),
          error: (err) => observer.error(err),
        });
    });
  }

  getGameById(id: number) {
    return this.http.get<ApiResponse<Game>>(
      getApiUrl(apiConf.endpoints.game.findById(id))
    );
  }

  getGamesByCategoryName(categoryName: string) {
    return this.http.get<ApiResponse<Game[]>>(
      getApiUrl(apiConf.endpoints.game.findAllByCategoryName(categoryName))
    );
  }

  /* @FALTA IMPLEMENTAR *****
  *****************************
  getUserGames(idList: number[]) {
    return this.http.post<ApiResponse<Game[]>>(
      getApiUrl(apiConf.endpoints.games.getUserGames),
      idList
    );
  } */
}
