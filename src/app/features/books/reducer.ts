import { createReducer, on } from '@ngrx/store';
import { Book } from './model';
import { BooksApiActions } from './actions';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievedBookList, (_state, { books }) => books),
);
