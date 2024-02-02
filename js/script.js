// 获取 canvas 元素
var canvas = document.getElementById("fireworksCanvas");
var ctx = canvas.getContext("2d");

// 设置 canvas 宽度和高度
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 烟花数组
var fireworks = [];

// 创建烟花对象
function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * -15 - 10;
    this.color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    this.radius = Math.random() * 5 + 1;
    this.gravity = 0.1;

    this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.radius -= 0.05;

        if (this.radius <= 0) {
            fireworks.splice(fireworks.indexOf(this), 1);
        }
    };

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
}

// 创建烟花
function createFirework() {
    var firework = new Firework();
    fireworks.push(firework);
}

// 更新烟花
function updateFireworks() {
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
    }
}

// 绘制烟花
function drawFireworks() {
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw();
    }
}

// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createFirework();
    updateFireworks();
    drawFireworks();
    requestAnimationFrame(animate);
}

// 启动动画
animate();