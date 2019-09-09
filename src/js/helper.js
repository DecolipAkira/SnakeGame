class Helper
{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx    = canvas.getContext('2d');
    }

    drawRect(color, x, y, w, h) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }
    
    drawStrokeRect(color, x, y, w, r) {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, w, r)
    }

    drawArc(color, x, y, r) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    context() {
        return this.ctx;
    }
}