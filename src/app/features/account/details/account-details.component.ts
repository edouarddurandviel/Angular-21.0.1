import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { AccountDetailStore } from './signal/account-details.store';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionDirective,
} from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from '@shared/components/accordion/accordion.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

type content = {
  title: string;
  content: string;
};

export type AccountDetails = {
  id: number;
  title: string;
  description: string;
  content: content[];
};

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
export class AccountdetailsComponent {
  store = inject(AccountDetailStore);

  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  content = computed(() => this.data()?.['userData'] as AccountDetails | undefined);
}
