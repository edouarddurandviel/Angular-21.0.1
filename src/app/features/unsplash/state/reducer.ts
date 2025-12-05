import { createFeature, createReducer, on } from '@ngrx/store';
import * as UnsplashActions from './actions';

export interface PhotoList {
  total: number;
  total_page: number;
  results: any[];
  name: string;
}

export interface PhotoListState {
  payload: PhotoList[];
  loading: boolean;
  error: null;
}

export const initialState: PhotoListState = {
  payload: [],
  loading: false,
  error: null,
};

export const unsplashPhotoReducer = createFeature({
  name: 'unsplash',
  reducer: createReducer(
    initialState,
    on(UnsplashActions.getAllPhotos, (state) => ({ ...state, loading: true, error: null })),
    on(UnsplashActions.getAllPhotosSuccess, (state, { payload }) => ({
      ...state,
      payload: payload.results,
      loading: false,
      error: null,
    })),
    on(UnsplashActions.getAllPhotosFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(UnsplashActions.clearPhotosErrors, (state) => ({ ...state, error: null })),
  ),
});
