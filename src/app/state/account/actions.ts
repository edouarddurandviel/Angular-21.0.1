import { createAction, createActionGroup, props } from '@ngrx/store';
import { Subscription } from './interfaces';

export const loadSubscription = createAction('GET_SUBSCRIPTION');
export const loadSubscriptionSuccess = createAction(
  'GET_SUBSCRIPTION_SUCCESS',
  props<{ subscription: Subscription }>(),
);
export const loadSubscriptionFailure = createAction(
  'GET_SUBSCRIPTION_FAILURE',
  props<{ error: any }>(),
);

export const postSubscription = createAction(
  'POST_SUBSCRIPTION',
  props<{ subscription: Subscription }>(),
);
export const postSubscriptionSuccess = createAction(
  'POST_SUBSCRIPTION_SUCCESS',
  props<{ subscription: Subscription }>(),
);
export const postSubscriptionFailure = createAction(
  'POST_SUBSCRIPTION_FAILURE',
  props<{ error: any }>(),
);

export const AddSubscriptionActions = createActionGroup({
  source: 'Subscriptions',
  events: {
    POST_SUBSCRIPTION: props<{ bookId: string }>(),
    REMOVE_SUBSRIPTION: props<{ bookId: string }>(),
  },
});
