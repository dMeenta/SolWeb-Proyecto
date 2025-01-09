import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = 'http://localhost:8080/categories';
  constructor(private http: HttpClient) {}
  getCategories() {
    return this.http.get<Category[]>(this.url);
  }

  getCategoryById(id: number) {
    return this.http.get<Category>(this.url + `/${id}`);
  }
}
