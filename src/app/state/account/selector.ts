import { createSelector } from '@ngrx/store';
import { EntitySubscriptionState } from './interfaces';

export const selectSubscriptionFeature = (state: EntitySubscriptionState) => state;

export const selectSubscription = createSelector(
  selectSubscriptionFeature,
  (state: EntitySubscriptionState) => state,
);
