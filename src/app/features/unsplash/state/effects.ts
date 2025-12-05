import { Injectable, Inject, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import * as UnsplashActions from './actions';
import { UnsplashService } from './services';

// create side-effects - eq react thunks
export const getAllPhotosEffect$ = createEffect(
  (actions$ = inject(Actions), booksService = inject(UnsplashService)) => {
    return actions$.pipe(
      ofType(UnsplashActions.getAllPhotos),
      mergeMap(() =>
        booksService.searchForPhotos().pipe(
          map((payload) => UnsplashActions.getAllPhotosSuccess({ payload })),
          catchError((error) => of(UnsplashActions.getAllPhotosFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

// non-dispatching functional effect
export const logDispatchedActions = createEffect(() => inject(Actions).pipe(tap(console.log)), {
  functional: true,
  dispatch: false,
});
