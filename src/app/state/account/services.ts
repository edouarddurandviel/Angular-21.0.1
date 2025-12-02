import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from './interfaces';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  getSubscription(id: number) {
    return this.http.get<Subscription>(`${this.apiUrl}/posts/${id}`);
  }
}
