import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotoListState } from './reducer';

export const featureReadKey = 'unsplash';

// unsplash global feature
export const selectPhotosState = createFeatureSelector<PhotoListState>(featureReadKey);

export const photosSelector = createSelector(selectPhotosState, (state) => state.payload);

export const photosLoadingSelector = createSelector(selectPhotosState, (state) => state.loading);

export const photosErrorSelector = createSelector(selectPhotosState, (state) => state.error);
