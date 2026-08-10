export interface Subscription {
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  options: boolean[];
  prices: string;
}

export interface SubscriptionState {
  profile: Subscription;
  loading: boolean;
}
