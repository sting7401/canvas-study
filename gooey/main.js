import * as dat from 'dat.gui';

const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

let canvasWidth;
let canvasHeight;
let particles;
const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}

const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');

const controls = new function() {
    this.blurValue = 40;
    this.alphaChannel = 100;
    this.alphaOffset = -23;
    this.acc = 1.03;
    this.total = 10;
};

let gui = new dat.GUI();

const f1 = gui.addFolder('Gooey Effect');
f1.open();
f1.add(controls, 'blurValue', 0, 100).onChange(value => {
    feGaussianBlur.setAttribute('stdDeviation', value); 
})
f1.add(controls, 'alphaChannel', 1, 200).onChange(value => {
    feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`); 
})
f1.add(controls, 'alphaOffset', -40, 40).onChange(value => {
    feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`); 
})

const f2 = gui.addFolder('Particle Props');
f2.open();
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(value => {
    for (const item of particles) {
        item.acc = value;
    }
});
f2.add(controls, 'total', 1, 100, 1).onChange(value => {
    canvasWidth / 40
});

class Particle {
    constructor(x, y, radius, vy) {
        this.x = x;
        this.y =y ;
        this.radius = radius;
        this.vy = vy;
        this.acc = 1.03;
    }

    update() {
        this.vy *= this.acc;
        this.y += this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x,  this.y, this.radius, 0, Math.PI / 180 * 360);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    init() {
        canvasWidth = innerWidth;
        canvasHeight = innerHeight;
        
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = canvasHeight + 'px';
        
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        ctx.scale(dpr, dpr);
        
        // ctx.fillRect(10, 10, 50, 50);

        particles = [];
        const TOTAL = canvasWidth / 40;

        for (let index = 0; index < TOTAL; index++) {
            const x = randomNumBetween(0, canvasWidth);
            const y = randomNumBetween(0, canvasWidth);
            const radius = randomNumBetween(50, 100);
            const vy = randomNumBetween(1, 5);
            const particle = new Particle(x, y, radius, vy);

            particles.push(particle);
        } 
    }
}

// const x = 100;
// const y = 100;
// const radius = 50;
// const particle = new Particle(x, y, radius);
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

const init = () => {
    // console.log(dpr);

    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // ctx.fillRect(10, 10, 50, 50);

    particles = [];
    const TOTAL = canvasWidth / 40;

    for (let index = 0; index < TOTAL; index++) {
        const x = randomNumBetween(0, canvasWidth);
        const y = randomNumBetween(0, canvasWidth);
        const radius = randomNumBetween(50, 100);
        const vy = randomNumBetween(1, 5);
        const particle = new Particle(x, y, radius, vy);

        particles.push(particle);
    }    
}

const animate = () => {
    window.requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;

    if (delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // x를 1px 이동시키기
    
    // particle.y += 1;
    // particle.draw();

    particles.map(item => {
        item.update();
        item.draw();

        if (item.y - item.radius > canvasHeight ) {
            item.y = -item.radius;
            item.x = randomNumBetween(0, canvasWidth);
            item.radius = randomNumBetween(50, 100);
            item.vy = randomNumBetween(1, 5);
        }
    })

    // for (const item of particles) {
    //     item.update();
    //     item.draw();

    //     if (item.y - item.radius > canvasHeight ) {
    //         item.y = -item.radius;
    //         item.x = randomNumBetween(0, canvasWidth);
    //         item.radius = randomNumBetween(50, 100);
    //         item.vy = randomNumBetween(1, 5);
    //     }
    // }

    then = now - (delta % interval);
}


window.addEventListener('load', () => {
    init();
    animate();
});
window.addEventListener('resize', () => {
    init();
});
