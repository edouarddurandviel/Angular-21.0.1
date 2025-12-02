import { createReducer, on } from '@ngrx/store';
import * as SubscriptionActions from './actions';
import { SubscriptionState } from './interfaces';

export const initialState: SubscriptionState = {
  data: { firstName: '', lastName: '', email: '', options: null, plan: '', prices: '' },
  loading: false,
  error: '',
};

export const subscriptionReducer = createReducer(
  initialState,
  on(SubscriptionActions.postSubscription, (state, { subscription }) => ({
    data: {
      firstName: subscription.firstName,
      lastName: subscription.lastName,
      email: subscription.email,
      options: subscription.options,
      plan: subscription.plan,
      prices: subscription.prices,
    },
    loading: true,
    error: '',
  })),

  // on(SubscriptionActions.AddSubscriptionActions, (state, { subscription }) => {
  //     ...state,
  //   loading: true,
  //     error : '',
  //   }),

  // on(SubscriptionActions.postSubscriptionSuccess, (state, { subscription }) => ({
  //   firstName: subscription.firstName,
  //   lastName: subscription.lastName,
  //   email: subscription.email,
  //   options: subscription.options,
  //   plan: subscription.plan,
  //   prices: subscription.prices,
  //   loading: false,
  //   error: '',
  // })),
  on(SubscriptionActions.postSubscriptionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
