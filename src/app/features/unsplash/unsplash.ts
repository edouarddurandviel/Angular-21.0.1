import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './state/selectors';
import * as UnsplashActions from './state/actions';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-unsplash',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './unsplash.html',
  styleUrls: ['./unsplash.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsplashListComponent implements OnInit {
  private store = inject(Store);

  unsplashResults$: Observable<any[]> = this.store.select(Selectors.photosSelector);
  loading$ = this.store.select(Selectors.photosLoadingSelector);
  error$ = this.store.select(Selectors.photosErrorSelector);

  ngOnInit() {
    this.store.dispatch(UnsplashActions.getAllPhotos());

    this.unsplashResults$.subscribe((e) => console.log(e));
  }
}
