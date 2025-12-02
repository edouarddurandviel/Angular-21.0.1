import { Component, inject, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as SubscriptionSelector from '../../state/account/selector';
import * as SubscriptionActions from '../../state/account/actions';
import { Subscription } from '../../state/account/interfaces';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule],
  providers: [Store],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class Account implements OnInit {
  private store = inject(Store);

  readonly subscription$ = this.store.selectSignal(SubscriptionSelector.selectSubscriptionFeature);

  ngOnInit() {
    this.account.patchValue({
      firstName: 'Edouard',
      lastName: 'Durand',
      email: 'test@test.com',
      plan: 'one',
      options: [false, false, true],
      prices: 'Pro',
    });
  }
  // data
  someOptions = ['Email Notifications', 'SMS Alerts', 'Push Notifications'];
  planOption = ['Basic', 'Pro', 'Enterprise'];
  id = 10;
  // form
  account = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    plan: new FormControl('', [Validators.required]),
    options: new FormArray(this.someOptions.map((o) => new FormControl(false))),
    prices: new FormControl(''),
  });
  get firstName() {
    return this.account.get('firstName');
  }
  get lastName() {
    return this.account.get('lastName');
  }
  get email() {
    return this.account.get('email');
  }
  get options() {
    return this.account.get('options') as FormArray;
  }
  get prices() {
    return this.account.get('prices');
  }

  onSubmit() {
    const formValue = this.account.value;

    const subscription = {
      ...formValue,
    } as Subscription;

    // For demo purpose, the "Action From user interaction with the page"
    // Only sends data to the presentation view
    this.store.dispatch(SubscriptionActions.postSubscription({ subscription }));
  }
}
