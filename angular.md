# Angular



```bash
/src

├── app

│   ├── core

│   │   ├── interceptors

│   │   │   └── auth.interceptor.ts

│   │   ├── guards

│   │   │   └── auth.guard.ts

│   │   ├── auth.service.ts

│   │   └── user.service.ts

│   ├── shared

│   │   ├── components

│   │   │   └── navbar/

│   │   │   └── sidebar/

│   │   ├── directives

│   │   │   └── debounce.directive.ts

│   │   ├── pipes

│   │   │   └── currency-format.pipe.ts

│   │   └── shared.module.ts

│   ├── features

│   │   ├── admin

│   │   │   ├── components

│   │   │   │   └── admin-dashboard.component.ts

│   │   │   ├── services

│   │   │   │   └── admin.service.ts

│   │   │   ├── admin.module.ts

│   │   │   └── admin-routing.module.ts

│   │   ├── user

│   │   │   ├── components

│   │   │   │   └── user-profile.component.ts

│   │   │   │   └── user-settings.component.ts

│   │   │   ├── services

│   │   │   │   └── user.service.ts

│   │   │   ├── user.module.ts

│   │   │   └── user-routing.module.ts

│   │   ├── products

│   │   │   ├── components

│   │   │   │   └── product-list.component.ts

│   │   │   │   └── product-details.component.ts

│   │   │   ├── services

│   │   │   │   └── product.service.ts

│   │   │   ├── products.module.ts

│   │   │   └── products-routing.module.ts

│   │   └── state

│   │       ├── reducers

│   │       │   └── auth.reducer.ts

│   │       │   └── user.reducer.ts

│   │       └── actions

│   │           └── auth.actions.ts

│   │           └── user.actions.ts

│   ├── app.component.ts

│   ├── app.module.ts

│   └── app-routing.module.ts

├── assets

├── environments

├── styles

├── main.ts

└── index.html
```


```javascript
// Copyright Brandon Roberts:
// https://x.com/brandontroberts/status/1710773567565050310

export const PostComponent = Component(() => {
  const posts = signal<Post[]>([]);
  const postsService = inject(PostsService);

  onInit(() => {
    postsService.getPosts().then((postList) => posts.set(postList));
  });

  afterNextRender(() => console.log('after next render'));

  afterRender(() => console.log('after render'));

  effect(() => console.log('posts', posts()));

  return {
    template: `
      <div class="text-2xl">
        @for (post of posts; track post.attributes.slug) {
          <div class="py-4">
            <a use:routerLink="[
              '/blog', 'posts', post.attributes.slug]" 
              class="text-gray-600">
              {{ post.attributes.title }}
            </a>
          </div>

          <p class="text-sm">
            {{ date(post.attributes.publishedDate, 
              'MMMM dd, yyyy') }}
          </p>
        }
      </div>
    `,
  };
});


/// fullcrud

// Project structure (copy into your Angular app src/app/productions)

// src/app/productions/models/production.model.ts
export interface Production {
  id: string; // uuid or number depending on backend
  title: string;
  description?: string;
  startDate?: string; // ISO date
  endDate?: string;   // ISO date
}

// src/app/productions/services/productions.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Production } from '../models/production.model';

@Injectable({ providedIn: 'root' })
export class ProductionsService {
  private base = '/api/productions'; // change to your real API

  constructor(private http: HttpClient) {}

  list(): Observable<Production[]> {
    return this.http.get<Production[]>(this.base);
  }

  get(id: string): Observable<Production> {
    return this.http.get<Production>(`${this.base}/${id}`);
  }

  create(prod: Partial<Production>): Observable<Production> {
    return this.http.post<Production>(this.base, prod);
  }

  update(id: string, changes: Partial<Production>): Observable<Production> {
    return this.http.put<Production>(`${this.base}/${id}`, changes);
  }

  delete(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.base}/${id}`);
  }
}

// src/app/productions/state/productions.actions.ts
import { createAction, props } from '@ngrx/store';
import { Production } from '../models/production.model';

// load list
export const loadProductions = createAction('[Productions] Load Productions');
export const loadProductionsSuccess = createAction('[Productions] Load Success', props<{ productions: Production[] }>());
export const loadProductionsFailure = createAction('[Productions] Load Failure', props<{ error: any }>());

// load one
export const loadProduction = createAction('[Productions] Load Production', props<{ id: string }>());
export const loadProductionSuccess = createAction('[Productions] Load Production Success', props<{ production: Production }>());
export const loadProductionFailure = createAction('[Productions] Load Production Failure', props<{ error: any }>());

// create
export const createProduction = createAction('[Productions] Create Production', props<{ production: Partial<Production> }>());
export const createProductionSuccess = createAction('[Productions] Create Production Success', props<{ production: Production }>());
export const createProductionFailure = createAction('[Productions] Create Production Failure', props<{ error: any }>());

// update
export const updateProduction = createAction('[Productions] Update Production', props<{ id: string; changes: Partial<Production> }>());
export const updateProductionSuccess = createAction('[Productions] Update Production Success', props<{ production: Production }>());
export const updateProductionFailure = createAction('[Productions] Update Production Failure', props<{ error: any }>());

// delete
export const deleteProduction = createAction('[Productions] Delete Production', props<{ id: string }>());
export const deleteProductionSuccess = createAction('[Productions] Delete Production Success', props<{ id: string }>());
export const deleteProductionFailure = createAction('[Productions] Delete Production Failure', props<{ error: any }>());

// optional: clear errors / reset state
export const clearProductionsError = createAction('[Productions] Clear Error');

// src/app/productions/state/productions.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ProductionsActions from './productions.actions';
import { Production } from '../models/production.model';

export interface ProductionsState extends EntityState<Production> {
  loading: boolean;
  selectedId?: string | null;
  error?: any | null;
}

export const adapter: EntityAdapter<Production> = createEntityAdapter<Production>({ selectId: p => p.id });

export const initialState: ProductionsState = adapter.getInitialState({
  loading: false,
  selectedId: null,
  error: null,
});

const productionsReducer = createReducer(
  initialState,

  // Load list
  on(ProductionsActions.loadProductions, state => ({ ...state, loading: true, error: null })),
  on(ProductionsActions.loadProductionsSuccess, (state, { productions }) =>
    adapter.setAll(productions, { ...state, loading: false })
  ),
  on(ProductionsActions.loadProductionsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Load one
  on(ProductionsActions.loadProduction, (state, { id }) => ({ ...state, loading: true, selectedId: id, error: null })),
  on(ProductionsActions.loadProductionSuccess, (state, { production }) =>
    adapter.upsertOne(production, { ...state, loading: false })
  ),
  on(ProductionsActions.loadProductionFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Create
  on(ProductionsActions.createProduction, state => ({ ...state, loading: true, error: null })),
  on(ProductionsActions.createProductionSuccess, (state, { production }) =>
    adapter.addOne(production, { ...state, loading: false })
  ),
  on(ProductionsActions.createProductionFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Update
  on(ProductionsActions.updateProduction, state => ({ ...state, loading: true, error: null })),
  on(ProductionsActions.updateProductionSuccess, (state, { production }) =>
    adapter.upsertOne(production, { ...state, loading: false })
  ),
  on(ProductionsActions.updateProductionFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Delete
  on(ProductionsActions.deleteProduction, state => ({ ...state, loading: true, error: null })),
  on(ProductionsActions.deleteProductionSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ProductionsActions.deleteProductionFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // clear error
  on(ProductionsActions.clearProductionsError, state => ({ ...state, error: null }))
);

export function reducer(state: ProductionsState | undefined, action: Action) {
  return productionsReducer(state, action);
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

// src/app/productions/state/productions.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductions from './productions.reducer';

export const productionsFeatureKey = 'productions';

export const selectProductionsState = createFeatureSelector<fromProductions.ProductionsState>(productionsFeatureKey);

export const selectAllProductions = createSelector(selectProductionsState, fromProductions.selectAll);
export const selectProductionsEntities = createSelector(selectProductionsState, fromProductions.selectEntities);
export const selectProductionsLoading = createSelector(selectProductionsState, s => s.loading);
export const selectProductionsError = createSelector(selectProductionsState, s => s.error);
export const selectSelectedProductionId = createSelector(selectProductionsState, s => s.selectedId);
export const selectSelectedProduction = createSelector(
  selectProductionsEntities,
  selectSelectedProductionId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

// src/app/productions/state/productions.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductionsService } from '../services/productions.service';
import * as ProductionsActions from './productions.actions';
import { catchError, map, mergeMap, of, concatMap } from 'rxjs';

@Injectable()
export class ProductionsEffects {
  loadProductions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductionsActions.loadProductions),
      mergeMap(() =>
        this.service.list().pipe(
          map(productions => ProductionsActions.loadProductionsSuccess({ productions })),
          catchError(error => of(ProductionsActions.loadProductionsFailure({ error })))
        )
      )
    )
  );

  loadProduction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductionsActions.loadProduction),
      concatMap(({ id }) =>
        this.service.get(id).pipe(
          map(production => ProductionsActions.loadProductionSuccess({ production })),
          catchError(error => of(ProductionsActions.loadProductionFailure({ error })))
        )
      )
    )
  );

  createProduction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductionsActions.createProduction),
      concatMap(({ production }) =>
        this.service.create(production).pipe(
          map(created => ProductionsActions.createProductionSuccess({ production: created })),
          catchError(error => of(ProductionsActions.createProductionFailure({ error })))
        )
      )
    )
  );

  updateProduction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductionsActions.updateProduction),
      concatMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          map(updated => ProductionsActions.updateProductionSuccess({ production: updated })),
          catchError(error => of(ProductionsActions.updateProductionFailure({ error })))
        )
      )
    )
  );

  deleteProduction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductionsActions.deleteProduction),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ProductionsActions.deleteProductionSuccess({ id })),
          catchError(error => of(ProductionsActions.deleteProductionFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: ProductionsService) {}
}

// src/app/productions/state/index.ts (barrel)
export * from './productions.actions';
export * from './productions.reducer';
export * from './productions.selectors';
export * from './productions.effects';

// src/app/productions/productions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProductions from './state/productions.reducer';
import { ProductionsEffects } from './state/productions.effects';
import { ProductionsListComponent } from './components/productions-list.component';
import { ProductionsDetailComponent } from './components/productions-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductionsListComponent, ProductionsDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('productions', fromProductions.reducer),
    EffectsModule.forFeature([ProductionsEffects]),
  ],
  exports: [ProductionsListComponent, ProductionsDetailComponent]
})
export class ProductionsModule {}

// src/app/productions/components/productions-list.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Production } from '../models/production.model';
import * as fromProductions from '../state/productions.selectors';
import * as ProductionsActions from '../state/productions.actions';

@Component({
  selector: 'app-productions-list',
  template: `
    <div>
      <h2>Productions</h2>
      <button (click)="reload()">Reload</button>
      <ul>
        <li *ngFor="let p of productions$ | async">
          {{ p.title }}
          <button (click)="edit(p.id)">Edit</button>
          <button (click)="remove(p.id)">Delete</button>
        </li>
      </ul>
      <div *ngIf="loading$ | async">Loading...</div>
      <div *ngIf="error$ | async as e">Error: {{ e | json }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionsListComponent {
  productions$: Observable<Production[]> = this.store.select(fromProductions.selectAllProductions);
  loading$ = this.store.select(fromProductions.selectProductionsLoading);
  error$ = this.store.select(fromProductions.selectProductionsError);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(ProductionsActions.loadProductions());
  }

  reload() {
    this.store.dispatch(ProductionsActions.loadProductions());
  }

  edit(id: string) {
    // navigate to detail or dispatch loadProduction
    this.store.dispatch(ProductionsActions.loadProduction({ id }));
  }

  remove(id: string) {
    if (confirm('Delete production?')) this.store.dispatch(ProductionsActions.deleteProduction({ id }));
  }
}

// src/app/productions/components/productions-detail.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as fromProductions from '../state/productions.selectors';
import * as ProductionsActions from '../state/productions.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productions-detail',
  template: `
    <div *ngIf="production$ | async as production">
      <h3>Edit Production</h3>
      <form [formGroup]="form" (ngSubmit)="save()">
        <input formControlName="title" placeholder="Title" />
        <textarea formControlName="description" placeholder="Description"></textarea>
        <button type="submit">Save</button>
      </form>
    </div>

    <div *ngIf="!(production$ | async)">
      <h3>Create Production</h3>
      <form [formGroup]="form" (ngSubmit)="create()">
        <input formControlName="title" placeholder="Title" />
        <textarea formControlName="description" placeholder="Description"></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionsDetailComponent {
  production$!: Observable<any>;
  form: FormGroup;
  selectedId?: string | null;

  constructor(private store: Store, private fb: FormBuilder) {
    this.form = this.fb.group({ title: [''], description: [''] });
  }

  ngOnInit() {
    this.production$ = this.store.select(fromProductions.selectSelectedProduction);
    this.store.select(fromProductions.selectSelectedProductionId).subscribe(id => this.selectedId = id);

    this.production$.subscribe(prod => {
      if (prod) this.form.patchValue({ title: prod.title, description: prod.description });
      else this.form.reset();
    });
  }

  save() {
    if (!this.selectedId) return;
    const changes = this.form.value;
    this.store.dispatch(ProductionsActions.updateProduction({ id: this.selectedId, changes }));
  }

  create() {
    const payload = this.form.value;
    this.store.dispatch(ProductionsActions.createProduction({ production: payload }));
  }
}

// Optional: productions.facade.ts (thin facade to encapsulate store usage)
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductionsActions from './state/productions.actions';
import * as fromProductions from './state/productions.selectors';
import { Observable } from 'rxjs';
import { Production } from './models/production.model';

@Injectable({ providedIn: 'root' })
export class ProductionsFacade {
  productions$ = this.store.select(fromProductions.selectAllProductions);
  loading$ = this.store.select(fromProductions.selectProductionsLoading);
  selected$ = this.store.select(fromProductions.selectSelectedProduction);

  constructor(private store: Store) {}

  loadAll() { this.store.dispatch(ProductionsActions.loadProductions()); }
  load(id: string) { this.store.dispatch(ProductionsActions.loadProduction({ id })); }
  create(production: Partial<Production>) { this.store.dispatch(ProductionsActions.createProduction({ production })); }
  update(id: string, changes: Partial<Production>) { this.store.dispatch(ProductionsActions.updateProduction({ id, changes })); }
  delete(id: string) { this.store.dispatch(ProductionsActions.deleteProduction({ id })); }
}

// Quick usage notes:
// 1) Import ProductionsModule into your AppModule or a feature module.
// 2) Ensure StoreModule.forRoot and EffectsModule.forRoot are configured in AppModule.
// 3) Update ProductionsService.base to point to your real backend.
// 4) Adjust types (id as number) if needed.
// 5) Consider adding notifications/optimistic updates and more granular loading flags for UX.

// That's it — the canvas contains a ready-to-copy NgRx CRUD implementation for "productions".


```

