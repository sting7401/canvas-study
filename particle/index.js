import CanvasOption from "./js/canvasOption.js";
import Particle from "./js/Particle.js";
import { randomNumBetween } from "./js/utils.js";

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.particles = [];
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

    this.createParticle();
  }

  createParticle() {
    const PARTICLE_NUM = 400;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);

    for (let i = 0; i < PARTICLE_NUM; i += 1) {
      const r = randomNumBetween(0, 3);
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      this.particles.push(new Particle(x, y, vx, vy));
    }
  }

  render() {
    let now;
    let delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;

      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.opacity < 0) {
          this.particles.splice(index, 1);
        }
      });

      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});
