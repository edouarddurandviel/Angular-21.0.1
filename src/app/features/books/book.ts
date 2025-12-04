import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './state/selectors'
import { BooksActions, BooksApiActions } from './state/actions';
import { GoogleBooksService } from './services/services';
import { BookListComponent } from './components/list/book-list-component';
import { BookCollectionComponent } from './components/collection/book-collection.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.html',
  imports: [BookListComponent, BookCollectionComponent, AsyncPipe],
})
export class BookComponent implements OnInit {
  books$: any;
  bookCollection$: any;
  private store = inject(Store);
  private booksService = inject(GoogleBooksService);

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

  ngOnInit() {
    this.books$ = this.store.select(selectBooks);
    this.bookCollection$ = this.store.select(selectBookCollection);

    this.booksService
      .getBooks()
      .subscribe((books) => this.store.dispatch(BooksApiActions.retrievedBookList({ books })));
  }
}
