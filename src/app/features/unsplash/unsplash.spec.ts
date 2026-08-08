import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as Selectors from './state/selectors';

import { UnsplashListComponent } from './unsplash';

describe('Unsplash', () => {
  let component: UnsplashListComponent;
  let fixture: ComponentFixture<UnsplashListComponent>;

  let store: MockStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UnsplashListComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: Selectors.photosSelector,
              value: [],
            },
            {
              selector: Selectors.photosLoadingSelector,
              value: false,
            },
            {
              selector: Selectors.photosErrorSelector,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UnsplashListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
