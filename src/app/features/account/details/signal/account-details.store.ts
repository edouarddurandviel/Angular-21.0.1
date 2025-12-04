import { Injectable, signal, inject, effect } from '@angular/core';
import { AccountdetailsService } from '../account-details.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AccountDetailStore {
  private AccountDetailService = inject(AccountdetailsService);
  private route = inject(ActivatedRoute);
  private id = toSignal(this.route.params, { initialValue: { id: null } });

  post = signal<any | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const { id } = this.id();

      if (!id) return;

      const accountId = Number(id);
      if (!accountId) return;

      this.#loadPost(accountId);
    });
  }

  #loadPost(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.AccountDetailService.getPost(id).subscribe({
      next: (res) => {
        this.post.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load product');
        this.loading.set(false);
      },
    });
  }
}
