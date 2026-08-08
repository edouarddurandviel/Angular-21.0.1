import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment.development';
import { Book } from '../state/model';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Array<Book>> {
    return this.http
      .get<{
        items: Book[];
      }>(
        `https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${environment.googleApiKey}`,
      )
      .pipe(map((books) => books.items || []));
  }
}
