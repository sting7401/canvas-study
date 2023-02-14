export default class CanvasOption {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
    this.fps = 60;
    this.interval = 1000 / this.fps;

    // eslint-disable-next-line no-restricted-globals
    this.canvasWidth = innerWidth;
    // eslint-disable-next-line no-restricted-globals
    this.canvasHeight = innerHeight;
  }
}
