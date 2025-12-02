import { EntityState } from '@ngrx/entity';
import { Observable } from 'rxjs';

export type Subscription = {
  firstName: string;
  lastName: string;
  email: string;
  options: boolean[] | null;
  plan: string;
  prices: string;
};

export interface SubscriptionData {
  data: Subscription;
}

export interface SubscriptionService {
  getSubscription(): Observable<Subscription>;
  getSubscriptions(): Observable<Subscription[]>;
  postSubscription(): Observable<Subscription>;
}

export interface EntitySubscriptionState extends EntityState<SubscriptionData> {
  loading: boolean;
  error: any;
}

export interface SubscriptionState extends SubscriptionData {
  loading: boolean;
  error: any;
}
