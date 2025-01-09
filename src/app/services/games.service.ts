import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  url = 'http://localhost:8080/games';
  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<Game[]>(this.url);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(this.url + `/${id}`);
  }

  getGamesByCategory(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + `/category/${id}`);
  }
}
