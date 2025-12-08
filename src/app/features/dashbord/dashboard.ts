import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as main from './canvas/main';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() width = 1000;
  @Input() height = 500;
  @Input() pixelRatio = window.devicePixelRatio || 1;

  private ctx: CanvasRenderingContext2D | null = null;
  private rafId: number | null = null;

  // ngOnInit(): void {
  //   main.draw()
  // }

  ngOnInit(): void {
    main.drawMain();
  }
}
