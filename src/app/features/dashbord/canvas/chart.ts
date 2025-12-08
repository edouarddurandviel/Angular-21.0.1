import graphics from './graphics';

export type Data = { x: number; y: number };

export class Chart {
  private canvas: HTMLCanvasElement;
  private container;
  private dataSource: Data[];
  private options: any;
  private axesLabels: any;
  private styles: string;
  private ctx: CanvasRenderingContext2D | null;
  private margin: number;
  private transparency: number;
  private pixelBounds: any;
  private dataBounds: any;
  private draw: void;
  private ratio;

  constructor(container: any, options: any) {
    this.container = container;
    this.options = options;
    this.dataSource = options.data;
    this.axesLabels = options.axesLabel, 
    this.styles = options.styles;
    this.ratio = window.devicePixelRatio;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.margin = options.size.width * 0.1;
    this.transparency = 0.5;

    this.pixelBounds = this.#getPixelBounds();
    this.dataBounds = this.#getDataBounds();

    this.draw = this.#draw();
  }

  #getPixelBounds() {
    const { canvas, margin } = this;
    const bounds = {
      left: margin,
      right: canvas.width - margin,
      top: margin,
      bottom: (canvas.height = margin),
    };
    return bounds;
  }

  #getDataBounds() {
    const { dataSource } = this;
    const x = dataSource.map((v: Data) => v.x);
    const y = dataSource.map((v: any) => v.y);

    const minX = Math.min(...x);
    const maxX = Math.max(...x);
    const minY = Math.min(...y);
    const maxY = Math.max(...y);
    const bounds = {
      left: minX,
      top: maxY,
      bottom: minY,
      right: maxX,
    };
    return bounds;
  }

  #draw() {
    const { ctx, canvas, options, container, transparency, ratio } = this;
    if (ctx) {
      ctx.canvas.height = options.size.height * ratio;
      ctx.canvas.width = options.size.width * ratio;
      ctx.canvas.style = `background-color: ${options.styles.backgroundColor}; box-sizing: border-box;`;

      container.appendChild(this.canvas);

      ctx.clearRect(0, 0, canvas.width, this.options.size.height);
      ctx.globalAlpha = transparency;
      this.#drawSample();
      ctx.globalAlpha = 1;

      ctx.restore();
    }
  }

  #buildXAxis(){
    const { options } = this
    const bottom = document.getElementById('canvasArea_bottom') as HTMLElement;
    const canvas = document.createElement('canvas');
    bottom.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if(ctx){
      ctx.clearRect(0, 0, 30, options.size.height);
    }
  }

  #buildYAxis(){
     const { options } = this
    const bottom = document.getElementById('canvasArea_left') as HTMLElement;
    const canvas = document.createElement('canvas');
    bottom.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if(ctx){
      ctx.clearRect(0, 0, options.size.width, 30);
    }
  }

  #drawSample() {
    const { ctx, dataSource, canvas, margin, dataBounds, pixelBounds } = this;
    let n = dataSource.length;
    for (let i = 0; i < n; i++) {
      const positionX = ((canvas.width - pixelBounds.right) / 12) * i;
      const points: [number, number] = [
        (positionX + pixelBounds.left).toFixed(0),
        (dataSource[i].y + pixelBounds.bottom).toFixed(0),
      ];

      if (points.length == 2) {
        graphics.drawPoints(ctx, points);
      }

      const labels = {
        x: {
          left: canvas.height - pixelBounds.bottom.toFixed(0) + 80,
          bottom: canvas.width / 2 - canvas.width * 0.03,
        },
        y: {
          left: margin - 30,
          bottom: canvas.width / 2 - canvas.width * 0.03,
        },
      };

      graphics.drawText(
        ctx,
        'Months',
        [labels.x.left, labels.x.bottom],
        'center',
        'middle',
        15,
        '#666',
      );
    }
  }
}
