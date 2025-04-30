import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<ApiResponse<Game>>(
      getApiUrl(apiConf.endpoints.games.list)
    );
  }

  getGameById(id: number) {
    return this.http.get<ApiResponse<Game>>(
      getApiUrl(apiConf.endpoints.games.detail(id))
    );
  }

  getGamesByCategory(id: number) {
    return this.http.get<ApiResponse<Game[]>>(
      getApiUrl(apiConf.endpoints.games.filterByCategory(id))
    );
  }
}
