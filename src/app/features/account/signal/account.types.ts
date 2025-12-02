export type Subscription = {
    firstName: string;
    lastName: string;
    email: string;
    plan: string;
    options: boolean[];
    prices: string;
};

export type SubscriptionState = {
    profile: Subscription;
    loading: boolean;
};
