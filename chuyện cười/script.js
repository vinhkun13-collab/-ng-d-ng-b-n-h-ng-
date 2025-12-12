// Chuyển trang
this.speed = random(3, 6);
this.boomed = false;
this.particles = [];



update() 
{
if (!this.boomed) {
this.y -= this.speed;
if (this.y <= this.targetY) {
this.boomed = true;
for (let i = 0; i < 40; i++) {
this.particles.push({
x: this.x,
y: this.y,
vx: random(-3, 3),
vy: random(-3, 3),
life: random(20, 40)
});
}
}
} else {
this.particles.forEach(p => {
p.x += p.vx;
p.y += p.vy;
p.life--;
});
}
}


draw() 
{
if (!this.boomed) {
ctx.fillStyle = "white";
ctx.fillRect(this.x, this.y, 3, 3);
} else {
this.particles.forEach(p => {
ctx.fillStyle = "hsl(" + random(0, 360) + ",100%,50%)";
ctx.fillRect(p.x, p.y, 3, 3);
});
}
}



function loop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);


if (Math.random() < 0.05) fireworks.push(new Firework());


fireworks.forEach((fw, i) => {
fw.update();
fw.draw();
if (fw.boomed && fw.particles.every(p => p.life <= 0)) fireworks.splice(i, 1);
});


requestAnimationFrame(loop);
}


loop();