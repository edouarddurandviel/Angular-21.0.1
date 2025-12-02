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
import { booksReducer } from './features/books/reducer';
import { collectionReducer } from './features/books/collection';

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
    }),
  ],
};
