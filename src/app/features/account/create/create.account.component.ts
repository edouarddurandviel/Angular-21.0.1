import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AccountDetailStore } from '../details/signal/account-details.store';

@Component({
  selector: 'app-account-details',
  standalone: true,
  providers: [AccountDetailStore],
  templateUrl: './create.account.component.html',
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  store = inject(AccountDetailStore);

  readonly items = [
    { title: 'Section 1', content: 'Content for section 1' },
    { title: 'Section 2', content: 'Content for section 2' },
    { title: 'Section 3', content: 'Content for section 3' },
  ];

  ngOnInit() {}

  ngOnDestroy() {}
}
