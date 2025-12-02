import { Component, Input } from '@angular/core';

export interface AccordionItem {
  title: string;
  content: string;
  open?: boolean;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];

  toggle(item: AccordionItem) {
    this.items.forEach((e) => {
      if (e !== item) {
        e.open = false;
      }
    });
    item.open = !item.open;
  }
}
