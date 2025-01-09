import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { UsersService } from './users.service';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _users = inject(UsersService);

  async signUp(user: User) {
    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    this._users.createUser(userCredential.user.uid, {
      email: '',
      profile_url: '',
      username: '',
    });
    return userCredential.user.uid;
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }
}
