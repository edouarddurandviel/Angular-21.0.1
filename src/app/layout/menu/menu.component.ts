import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class Menu {
  currentRoute = '';

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
}
