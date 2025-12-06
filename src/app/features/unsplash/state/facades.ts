import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  Store,
  createAction,
  on,
  props,
  createReducer,
  ActionCreator,
} from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, Observable, of } from 'rxjs';
import { EntityAdapter } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class StoreFacade {
  constructor(private store: Store) {}

  select = <T>(selector: Selector<any, T>) => this.store.select(selector);
  dispatch = (action: Action) => this.store.dispatch(action);
}

// entity-actions.ts
export function createEntityActions<T>(entity: string) {
  return {
    load: createAction(`[${entity}] Load`, props<{ id: string }>()),
    loadAll: createAction(`[${entity}] Load All`),
    loadSuccess: createAction(`[${entity}] Load Success`, props<{ data: T | T[] }>()),
    loadFailure: createAction(`[${entity}] Load Failure`, props<{ error: any }>()),

    create: createAction(`[${entity}] Create`, props<{ body: Partial<T> }>()),
    createSuccess: createAction(`[${entity}] Create Success`, props<{ data: T }>()),
    createFailure: createAction(`[${entity}] Create Failure`, props<{ error: any }>()),

    update: createAction(`[${entity}] Update`, props<{ id: string; changes: Partial<T> }>()),
    updateSuccess: createAction(`[${entity}] Update Success`, props<{ data: T }>()),
    updateFailure: createAction(`[${entity}] Update Failure`, props<{ error: any }>()),

    remove: createAction(`[${entity}] Delete`, props<{ id: string }>()),
    removeSuccess: createAction(`[${entity}] Delete Success`, props<{ id: string }>()),
    removeFailure: createAction(`[${entity}] Delete Failure`, props<{ error: any }>()),
  };
}

// entity-reducer.ts
export function createEntityReducer<T>(
  adapter: EntityAdapter<T>,
  actions: ReturnType<typeof createEntityActions<T>>,
) {
  const initialState = adapter.getInitialState({
    loading: false,
    error: null,
  });

  return createReducer(
    initialState,

    // Load
    on(actions.load, actions.loadAll, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(actions.loadSuccess, (state, { data }) =>
      adapter.setAll(Array.isArray(data) ? data : [data], {
        ...state,
        loading: false,
      }),
    ),

    on(actions.loadFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    // Create
    on(actions.createSuccess, (state, { data }) => adapter.addOne(data, state)),
    on(actions.createFailure, (state, { error }) => ({
      ...state,
      error,
    })),

    // Update
    on(actions.updateSuccess, (state, { data }) =>
      adapter.updateOne({ id: (data as any).id, changes: data }, state),
    ),
    on(actions.updateFailure, (state, { error }) => ({
      ...state,
      error,
    })),

    // Delete
    on(actions.removeSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(actions.removeFailure, (state, { error }) => ({
      ...state,
      error,
    })),
  );
}

export function createEntityEffects<T>(
  actions: ReturnType<typeof createEntityActions<T>>,
  service: {
    load(id: string): Observable<T>;
    loadAll(): Observable<T>;
    create(body: Partial<T>): Observable<T>;
    update(id: string, changes: Partial<T>): Observable<T>;
    remove(id: string): Observable<T>;
  },
  actions$: Actions,
) {
  return {
    load$: createEffect(() =>
      actions$.pipe(
        ofType(actions.load),
        exhaustMap(({ id }) =>
          service.load(id).pipe(
            map((data) => actions.loadSuccess({ data })),
            catchError((error) => of(actions.loadFailure({ error }))),
          ),
        ),
      ),
    ),

    loadAll$: createEffect(() =>
      actions$.pipe(
        ofType(actions.loadAll),
        exhaustMap(() =>
          service.loadAll().pipe(
            map((data) => actions.loadSuccess({ data })),
            catchError((error) => of(actions.loadFailure({ error }))),
          ),
        ),
      ),
    ),

    create$: createEffect(() =>
      actions$.pipe(
        ofType(actions.create),
        exhaustMap(({ body }) =>
          service.create(body).pipe(
            map((data) => actions.createSuccess({ data })),
            catchError((error) => of(actions.createFailure({ error }))),
          ),
        ),
      ),
    ),

    update$: createEffect(() =>
      actions$.pipe(
        ofType(actions.update),
        exhaustMap(({ id, changes }) =>
          service.update(id, changes).pipe(
            map((data) => actions.updateSuccess({ data })),
            catchError((error) => of(actions.updateFailure({ error }))),
          ),
        ),
      ),
    ),

    remove$: createEffect(() =>
      actions$.pipe(
        ofType(actions.remove),
        exhaustMap(({ id }) =>
          service.remove(id).pipe(
            map(() => actions.removeSuccess({ id })),
            catchError((error) => of(actions.removeFailure({ error }))),
          ),
        ),
      ),
    ),
  };
}

// USE //////////
////////////////////

// Keeps NgRx explicit (actions still have names)
// No giant “one-size-fits-all” function
// Reduces duplication
// Type safe
// Clean and scalable
// IDE autocomplete works
// Works with EntityAdapter
// type User = {
//   id: string;
//   name: string;
// }
// adapter
// export const userAdapter = createEntityAdapter<User>();
// action
// export const userActions = createEntityActions<User>('User');
// reducer
// export const userReducer = createEntityReducer(userAdapter, userActions);
// effect
// @Injectable()
// export class UserEffects {
//   constructor(
//     private actions$: Actions,
//     private api: UserService,
//   ) {}

//   effects = createEntityEffects(userActions, this.api, this.actions$);
// }

// use
// this.store.dispatch(userActions.loadAll());
// this.store.dispatch(userActions.create({ body: newUser }));
// this.users$ = this.store.select(userSelectors.selectAll);
