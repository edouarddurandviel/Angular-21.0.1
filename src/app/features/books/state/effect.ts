import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GoogleBooksService } from "../services/google-books";
import { catchError, exhaustMap, map, of, pipe } from "rxjs";
import { BooksApiActions } from "./actions";

export const getAllBooksEffect$ = createEffect(
  (actions$ = inject(Actions), booksService = inject(GoogleBooksService)) => {
    return actions$.pipe(
      ofType(BooksApiActions.retrievedBookList),
      exhaustMap(() =>
        booksService.getBooks().pipe(
          map((books) => BooksApiActions.retrievedBookListSuccess({ books })),
          catchError((error) => of(BooksApiActions.retrievedBookListFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);