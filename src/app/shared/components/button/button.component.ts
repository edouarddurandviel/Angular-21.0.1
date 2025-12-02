import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  template: `<button class="btn_special" (click)="navigate()">
    Get information and navigate to account
  </button>`,
  styleUrl: './button.component.scss',
})
export class Button {
  private router = inject(Router);
  readonly route = input<string>();
  public params = input<{ id: number } | undefined>();

  alert = output<string>();
  dataObject = output<any>({ alias: 'data' });

  navigate() {
    this.router.navigate([this.route()]);
    this.alert.emit('button clicked');
    this.dataObject.emit({ id: 1, message: 'my message' });
  }
}
