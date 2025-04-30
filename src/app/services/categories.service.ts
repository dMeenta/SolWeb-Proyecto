import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import ApiResponse from '../models/ApiResponse';
import { apiConf, getApiUrl } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  getCategories() {
    return this.http.get<ApiResponse<Category[]>>(
      getApiUrl(apiConf.endpoints.categories.list)
    );
  }

  getCategoryById(id: number) {
    return this.http.get<ApiResponse<Category>>(
      getApiUrl(apiConf.endpoints.categories.detail(id))
    );
  }
}
