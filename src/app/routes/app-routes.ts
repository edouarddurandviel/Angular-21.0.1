import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home';
import { Account } from '../features/account/account';
import { BookComponent } from '../features/books/book';
import { Notfound } from '../pages/notfound/notfound.component';
import { CreateAccountComponent } from '../features/account/create/create.account.component';
import {
  AccountdetailsComponent,
} from '../features/account/details/account-details.component';
import { AuthGuard } from '../core/guards/auth-guard';
import { Login } from '../features/login/login';
import { accountResolver } from '../core/resolvers/account.resolver';
import { homeDataResolver } from '../core/resolvers/home.resolver';


const isPremium = true;

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    resolve: {
      homeData: homeDataResolver,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'account',
    component: Account,
    title: 'Account',
    canActivate: [AuthGuard],
  },
  {
    path: 'books',
    component: BookComponent,
    title: 'Books',
    canActivate: [AuthGuard],
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    title: 'Create account',
    canActivate: [AuthGuard],
  },
  {
    path: 'account-details/:id',
    component: AccountdetailsComponent,
    title: 'Account details',
    resolve: {
      userData: accountResolver,
    },
    data: { accountPageData: 'Account page detail for page!!!!' },
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => {
      return isPremium
        ? import('../features/dashbord/dashboard').then((p) => p.DashboardComponent)
        : import('../features/dashbord/dashboard').then((p) => p.DashboardComponent);
    },
    title: 'Administration dashbord',
    canActivate: [AuthGuard],
  },
  {
    path: 'redirect',
    redirectTo: '',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: Notfound,
    canActivate: [AuthGuard],
  },
];
