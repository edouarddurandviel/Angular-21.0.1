import { createReducer, on } from '@ngrx/store';
import { Book } from './model';
import { addBooks, loadBooks, mapBooks } from './actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// export const initialState: ReadonlyArray<Book> = [];

export interface State extends EntityState<Book> {
  // additional entities state properties
  selectBookId: string | null;
  sortedBooks: [] | null;
}

export function selectBookId(book: Book): string {
  return book.id;
}
export function sortByName(a: Book, b: Book): number {
  return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: selectBookId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectBookId: null,
  sortedBooks: null,
});

export const booksReducer = createReducer(
  initialState,
  on(addBooks, (state, { book }) => {
    return adapter.addOne(book, state);
  }),
  on(loadBooks, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(mapBooks, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
);
