import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as SubscriptionActions from './actions';
import { SubscriptionService } from './interfaces';

@Injectable()
export class SubscriptionEffects {
  loadSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.loadSubscription),
      mergeMap(() =>
        this.subscriptionService.getSubscription().pipe(
          map((subscription) => SubscriptionActions.loadSubscriptionSuccess({ subscription })),
          catchError((error) => of(SubscriptionActions.loadSubscriptionFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    @Inject('SubscriptionService') private subscriptionService: SubscriptionService,
  ) {}
}
