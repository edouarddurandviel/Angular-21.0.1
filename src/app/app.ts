import { Component, Input, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header.component';
import { Footer } from './layout/footer/footer.component';
import { Menu } from './layout/menu/menu.component';

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
