import { Injectable, inject } from '@angular/core';
import { Post } from './signal/account-details.interface';
import { Observable } from 'rxjs';
import { AccountdetailsRepository } from './account-details.repository';

@Injectable({ providedIn: 'root' })
export class AccountdetailsFacade {
  private repository = inject(AccountdetailsRepository);

  getPost(id: number): Observable<Post> {
    return this.repository.getPost(id);
  }
}
