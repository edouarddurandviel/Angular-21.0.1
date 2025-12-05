import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './routes/app-routes';
import { provideStore } from '@ngrx/store';
import { subscriptionReducer } from './state/account/reducer';
import { booksReducer } from './features/books/state/reducer';
import { collectionReducer } from './features/books/state/collection';
import { getAllPhotosEffect$, unsplashPhotoReducer } from './features/unsplash/state';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      subscription: subscriptionReducer,
      books: booksReducer,
      collection: collectionReducer,
      unsplash: unsplashPhotoReducer.reducer,
    }),
    provideEffects({ getAllPhotosEffect$ }),
  ],
};
