import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "da-notes-68be2",
      appId: "1:471750333561:web:e7828fc2b047a0ef06b0a8",
      storageBucket: "da-notes-68be2.firebasestorage.app",
      apiKey: "AIzaSyDiROWrNbSntp5_PmWgMUeOtqZ5txUkQjs",
      authDomain: "da-notes-68be2.firebaseapp.com",
      messagingSenderId: "471750333561"
    })),
    provideFirestore(() => getFirestore())
  ]
};
