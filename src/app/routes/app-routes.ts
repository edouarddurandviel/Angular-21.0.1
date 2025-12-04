import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent, HomeContent } from '../features/home/home.component';
import { Account } from '../features/account/account.component';
import { BookComponent } from '../features/books/book.component';
import { Notfound } from '../pages/notfound/notfound.component';
import { CreateAccountComponent } from '../features/account/create/create.account.component';
import {
  AccountDetails,
  AccountdetailsComponent,
} from '../features/account/details/account-details.component';
import { AuthGuard } from '../core/guards/auth-guard';
import { Login } from '../features/login/login';

const dataResolver: ResolveFn<AccountDetails> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return {
    id: route.queryParams[':id'],
    title: 'Account page details',
    description: 'Account page details description...',
    content: [
      { title: 'Section 1', content: 'Content for section 1' },
      { title: 'Section 2', content: 'Content for section 2' },
      { title: 'Section 3', content: 'Content for section 3' },
    ],
  };
};

const homeDataResolver: ResolveFn<HomeContent> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return {
    presentation: 'Presentation description',
    introduction: 'Introduction: describe services',
    description: 'Some detailed description',
  };
};

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
      userData: dataResolver,
    },
    data: { accountPageData: 'Account page detail for page!!!!' },
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => {
      return isPremium
        ? import('../features/dashbord/dashboard.component').then((p) => p.DashboardComponent)
        : import('../features/dashbord/dashboard.component').then((p) => p.DashboardComponent);
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
