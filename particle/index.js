import CanvasOption from "./js/canvasOption.js";
import Particle from "./js/Particle.js";
import Tail from "./js/Tail.js";
import { randomNumBetween, hypotenuse } from "./js/utils.js";

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.tails = [];
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

  crateTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
    const color = '255,255,255';

    this.tails.push(new Tail(x, vy, color));
  }


  createParticle(x, y, color) {
    const PARTICLE_NUM = 400;
    // const x = randomNumBetween(0, this.canvasWidth);
    // const y = randomNumBetween(0, this.canvasHeight);

    for (let i = 0; i < PARTICLE_NUM; i += 1) {
      const r = randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);

      const opacity = randomNumBetween(0.6, 0.9);
      this.particles.push(new Particle(x, y, vx, vy, opacity, color));
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

      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);


      if(Math.random() < 0.03) this.crateTail();

      this.tails.forEach((tail, index) => {
        tail.update();
        tail.draw();

        if (tail.vy > -0.7) {
          this.tails.splice(index, 1);
          this.createParticle(tail.x, tail.y, tail.color);
        } 
      })

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
