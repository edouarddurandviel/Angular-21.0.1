import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable } from 'rxjs';
import * as Selectors from './state/selectors';
import * as UnsplashActions from './state/actions';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AriaSelectComponent } from '@shared/components/aria-select/aria-select';

@Component({
  selector: 'app-unsplash',
  imports: [
    // AsyncPipe, 
    // JsonPipe, 
    AriaSelectComponent
  ],
  templateUrl: './unsplash.html',
  styleUrls: ['./unsplash.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsplashListComponent {
  private store = inject(Store);

  // unsplashResults$: Observable<any[]> = this.store
  //   .select(Selectors.photosSelector)
  //   .pipe(distinctUntilChanged());
    
  unsplashResults = this.store.selectSignal(Selectors.photosSelector);
  loading = this.store.selectSignal(Selectors.photosLoadingSelector);
  error = this.store.selectSignal(Selectors.photosErrorSelector);

  // loading$ = this.store.select(Selectors.photosLoadingSelector);
  // error$ = this.store.select(Selectors.photosErrorSelector);

  constructor() {
    this.store.dispatch(UnsplashActions.getAllPhotos({ color: 'yellow' }));
  }
}
