import { ResolveFn, Routes } from '@angular/router';
import { Home } from '../features/home/home.component';
import { Account } from '../features/account/account.component';
import { BookComponent } from '../features/books/book.component';
import { Notfound } from '../pages/notfound/notfound.component';
import { CreateAccountComponent } from '../features/account/create/create.account.component';
import { AccountdetailsComponent } from '../features/account/details/account-details.component';

const dataResolver: ResolveFn<Object> = (route) => {
  return {
    id: route.queryParams[':id'],
    title: 'Page title',
    description: 'Some description',
  };
};

const isPremium = true;

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'account',
    component: Account,
    title: 'Account',
  },
  {
    path: 'books',
    component: BookComponent,
    title: 'Books',
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    title: 'Create account',
  },
  {
    path: 'account-details/:id',
    component: AccountdetailsComponent,
    title: 'Account details',
    resolve: {
      userData: dataResolver,
    },
    data: { accountPageData: 'Account page detail for page!!!!' },
  },
  {
    path: 'dashboard',
    loadComponent: () => {
      return isPremium
        ? import('../features/dashbord/dashboard.component').then((p) => p.DashboardComponent)
        : import('../features/dashbord/dashboard.component').then((p) => p.DashboardComponent);
    },
    title: 'Administration dashbord',
  },
  {
    path: 'redirect',
    redirectTo: '',
  },
  { path: '**', component: Notfound },
];
