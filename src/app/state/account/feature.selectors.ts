import { createFeatureSelector, createSelector } from '@ngrx/store';
import { subscriptionAdapter } from './entity.adapter';
import { EntitySubscriptionState } from './interfaces';

// CRUD transactions
export const selectSubscriptionState =
  createFeatureSelector<EntitySubscriptionState>('subscription');

export const {
  selectAll: selectAllSubscriptions,
  selectEntities: selectSubscriptionEntities,
  selectIds: selectSubscriptionIds,
} = subscriptionAdapter.getSelectors(selectSubscriptionState);

export const selectLoading = createSelector(selectSubscriptionState, (state) => state.loading);

export const selectError = createSelector(selectSubscriptionState, (state) => state.error);
