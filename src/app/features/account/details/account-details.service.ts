import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './signal/account-details.types';

@Injectable({ providedIn: 'root' })
export class AccountdetailsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  getPost(id: number) {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }
}
