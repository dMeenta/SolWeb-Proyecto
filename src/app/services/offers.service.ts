import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offers } from '../models/Offers';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  url = 'http://localhost:8080/offers';
  constructor(private http: HttpClient) {}

  getOffers() {
    return this.http.get<Offers[]>(this.url);
  }
}
