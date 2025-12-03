import { Component, inject, OnInit, signal } from '@angular/core';
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
import { Subscription } from './signal/account.types';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, KeyValuePipe],
  providers: [Store],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class Account implements OnInit {
  profile$ = signal<Subscription | null>(null);
  loading$ = signal(false);
  error$ = signal<string | null>(null);

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
    email: new FormControl('', [Validators.email, Validators.required]),
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
    this.profile$.set(subscription);
    this.loading$.set(true);
    this.error$.set(null);

    this.setSessionToken(subscription, { token: 'qsdfd546464qsdf4df' });
  }

  private setSessionToken(subscription: any, token: any) {
    localStorage.setItem('session', JSON.stringify(subscription));
    sessionStorage.setItem('session', JSON.stringify(token));
  }
}
