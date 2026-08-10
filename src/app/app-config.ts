import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './routes/app-routes';
import { provideStore } from '@ngrx/store';
import { subscriptionReducer } from './state/account/reducer';
import { booksReducer } from './features/books/state/reducer';
import { collectionReducer } from './features/books/state/collection';
import { unsplashPhotoReducer } from './features/unsplash/state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    provideStore(
      {
        subscription: subscriptionReducer,
        books: booksReducer,
        collection: collectionReducer,
        unsplash: unsplashPhotoReducer.reducer,
      },
      // {
      //   runtimeChecks: {
      //     strictStateImmutability: true,
      //     strictActionImmutability: true,
      //     strictStateSerializability: true,
      //     strictActionSerializability: true,
      //     strictActionWithinNgZone: true,
      //     strictActionTypeUniqueness: true,
      //   },
      // },
    ),
    // provideMockStore(),
  ],
};
