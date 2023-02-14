import CanvasOption from './js/canvasOption';

class Canvas extends ClassOption {
  constructor() {
    super();
  }

  init() {
    // eslint-disable-next-line no-restricted-globals
    this.canvasWidth = innerWidth;
    // eslint-disable-next-line no-restricted-globals
    this.canvasHeight = innerHeight;

    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasHeight}px`;
  }

  render() {
    let now;
    let delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;
      if (delta > this.interval) return;

      then = now - delta / this.interval;
    };

    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener('load', () => {
  canvas.init();
  canvas.render();
});

window.addEventListener('resize', () => {
  canvas.init();
});
