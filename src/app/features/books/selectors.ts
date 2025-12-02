import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from './model';

export const featureReadKey = 'books';
export const featureCollecKey = 'collection';

export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>(featureReadKey);

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>(featureCollecKey);

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((book) => book.id === id)!);
  },
);
