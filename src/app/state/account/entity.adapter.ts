import { createEntityAdapter } from '@ngrx/entity';
import { EntitySubscriptionState, SubscriptionData } from './interfaces';

export const subscriptionAdapter = createEntityAdapter<SubscriptionData>();

export const initialState = subscriptionAdapter.getInitialState<EntitySubscriptionState>({
  loading: false,
  error: null,
});
