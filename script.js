const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createHearts();
});

let heartsArray = [];

class Heart {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.alpha = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 3, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y -= this.speed;
        this.alpha -= 0.005;
        if (this.alpha <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.alpha = 1;
        }
        this.draw();
    }
}

function createHearts() {
    heartsArray = [];
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10;
        const speed = Math.random() * 1.5 + 0.5;
        heartsArray.push(new Heart(x, y, size, speed));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heartsArray.forEach(heart => heart.update());
    requestAnimationFrame(animate);
}

createHearts();
animate();
