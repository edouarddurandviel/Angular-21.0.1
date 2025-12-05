import { createAction, props } from '@ngrx/store';

export const getAllPhotos = createAction('GET_ALL_PHOTOS_REQUEST');
export const getAllPhotosSuccess = createAction(
  'GET_ALL_PHOTOS_SUCCESS',
  props<{ payload: any }>(),
);
export const getAllPhotosFailure = createAction('GET_ALL_PHOTOS_FAILURE', props<{ error: any }>());
export const clearPhotosErrors = createAction('CLEAR_ERRORS');
