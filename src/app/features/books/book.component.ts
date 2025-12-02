import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './selectors';
import { BooksActions, BooksApiActions } from './actions';
import { GoogleBooksService } from './services';
import { BookListComponent } from './components/book-list-component';
import { BookCollectionComponent } from './components/book-collection.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './book.component.html',
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
