import { inject, Injectable } from '@angular/core';
import { authInstance$ } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { AuthStateService } from '../../shared/auth-state.service';
import { toSignal } from '@angular/core/rxjs-interop';

export interface User {
  id: string;
  email: string;
  username: string;
  profile_url: string;
}

export type UserCreate = Omit<User, 'id'>;

const PATH = 'users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _fireStore = inject(Firestore);
  private _collection = collection(this._fireStore, PATH);
  getUsers = toSignal(
    collectionData(this._collection, { idField: 'id' }) as Observable<any[]>,
    {
      initialValue: [],
    }
  );

  createUser(uid: string, user: UserCreate) {
    const userDocRef = doc(this._fireStore, `${PATH}/${uid}`);
    return setDoc(userDocRef, user);
  }

  getUser(id: string) {
    const docRef = doc(this._collection, id);
    return getDoc(docRef);
  }
}
