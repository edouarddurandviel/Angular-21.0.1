export default {
  drawPoints: (
    ctx: CanvasRenderingContext2D | null,
    loc: [number, number],
    color = 'black',
    size = 8,
  ) => {
    if (ctx) {
      console.log(loc);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(loc[0], loc[1], size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  drawText: (
    ctx: CanvasRenderingContext2D | null,
    text: string,
    loc: [number, number],
    align: CanvasTextAlign,
    vAlign: CanvasTextBaseline,
    size: number,
    color: string,
  ) => {
    if (ctx) {
      ctx.textAlign = align;
      ctx.textBaseline = vAlign;
      ctx.font = `normal ${size}px system-ui`;
      ctx.fillStyle = color;
      ctx.fillText(text, ...loc);
    }
  },
};
