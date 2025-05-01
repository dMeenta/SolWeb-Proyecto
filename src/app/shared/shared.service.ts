import { Injectable } from '@angular/core';
import { UserMSQL } from '../models/UserMSQL';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  getUserLogged(): UserMSQL | null {
    const user = localStorage.getItem('userLogged');
    return user ? JSON.parse(user) : null;
  }
}
