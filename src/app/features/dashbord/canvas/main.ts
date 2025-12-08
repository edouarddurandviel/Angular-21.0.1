import { hidden } from '@angular/forms/signals';
import { Chart } from './chart';

export const drawMain = () => {
  const canvas = document.getElementById('canvasArea_main') as HTMLElement;
  if (canvas) {
    const options = {
      size: {
        width: 1000,
        height: 500,
      },
      axesLabels: ['Months', 'Prices'],
      data: [
        { x: 'jan', y: 10 },
        { x: 'feb', y: 65 },
        { x: 'march', y: 54 },
        { x: 'april', y: 21 },
        { x: 'mai', y: 56 },
        { x: 'june', y: 78 },
        { x: 'jul', y: 23 },
        { x: 'aug', y: 45 },
        { x: 'sept', y: 52 },
        { x: 'oct', y: 21 },
        { x: 'nov', y: 56 },
        { x: 'dec', y: 26 },
      ],
      styles: {
        colorPoints: 'green',
        backgroundColor: '#fff',
      },
    };

    const chart = new Chart(canvas, options);

    return chart;
  } else {
    return false;
  }
};
