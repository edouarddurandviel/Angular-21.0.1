import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

export type HomeContent = {
  presentation: string;
  introduction: string;
  description: string;
};

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  content = computed(() => this.data()?.['homeData'] as HomeContent | undefined);
}
