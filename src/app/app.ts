import { Component, Input, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Menu } from './layout/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  protected readonly title = signal('codebase');

  @Input() set data(value: string) {
    console.log('New value:', value);
  }

  ngOnInit() {}

  ngOnChanges() {}

  ngOnDestroy() {}
}
