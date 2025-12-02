import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AccountDetailStore } from './signal/account-details.store';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionDirective,
} from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from '@components/accordion/accordion.component';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionDirective,
    AccordionComponent,
  ],
  providers: [AccountDetailStore],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
})
export class AccountdetailsComponent implements OnInit, OnDestroy {
  store = inject(AccountDetailStore);

  readonly items = [
    { title: 'Section 1', content: 'Content for section 1' },
    { title: 'Section 2', content: 'Content for section 2' },
    { title: 'Section 3', content: 'Content for section 3' },
  ];

  ngOnInit() {}

  ngOnDestroy() {}
}
