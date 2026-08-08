import { createAction, createActionGroup, props } from '@ngrx/store';
import { Book } from './model';
import { EntityMap } from '@ngrx/entity';

// single actions
export const loadBooks = createAction(
  '[Book/API] Load books',
  props<{ books: Book[]; entityMap: EntityMap<Book> }>(),
);
export const addBooks = createAction('[Book/API] add book', props<{ book: Book }>());
export const mapBooks = createAction(
  '[User/API] Map Books',
  props<{ entityMap: EntityMap<Book> }>(),
);

// grouped actions
export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Add Book': props<{ bookId: string }>(),
    'Remove Book': props<{ bookId: string }>(),
  },
});

export const BooksApiActions = createActionGroup({
  source: 'Books API',
  events: {
    'Retrieved Book List': props<{ books: ReadonlyArray<Book> }>(),
  },
});
