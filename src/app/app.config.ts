import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'loudlygmz',
        appId: '1:921908068271:web:bd18383415573865a6b95a',
        storageBucket: 'loudlygmz.firebasestorage.app',
        apiKey: 'AIzaSyB2Mmxo1DGYHu6jAghnbMa44tGixq7-5OI',
        authDomain: 'loudlygmz.firebaseapp.com',
        messagingSenderId: '921908068271',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
};
