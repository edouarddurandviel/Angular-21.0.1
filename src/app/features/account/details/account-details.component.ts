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
import { CustomTitlePipe } from '@shared/pipes/title.pipe';
import { AccountdetailsRepository } from './account-details.repository';
import { AccountdetailsFacade } from './account-details.facade';
import { AccountdetailsService } from './account-details.service';

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
    CustomTitlePipe,
  ],
  providers: [
    AccountDetailStore,
    AccountdetailsFacade,
    {
      provide: AccountdetailsRepository,
      useClass: AccountdetailsService,
    },
  ],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
})
export class AccountdetailsComponent {
  // account resolver dans route
  store = inject(AccountDetailStore);

  private route = inject(ActivatedRoute);
  userData = toSignal(this.route.data);

  filteredContent = computed(() => this.userData()?.['userData'] as AccountDetails | undefined);
}
