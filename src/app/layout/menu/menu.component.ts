import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class Menu {
  currentRoute = '';
  private AuthService = inject(AuthService);

  menu = [
    {
      path: '/',
      title: 'Home',
    },
    {
      path: '/account',
      title: 'Account',
    },
    {
      path: '/books',
      title: 'Books',
    },
    {
      path: '/dashboard',
      title: 'Dashboard',
    },
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.AuthService.logout();
    this.router.navigateByUrl('/');
  }
}
