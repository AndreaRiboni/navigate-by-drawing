import { CONFIG } from './config.js';

export class CanvasUtils {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.lineWidth = CONFIG.LINE_WIDTH;
        this.ctx.lineCap = 'round';
        this.initializeCanvas();
    }

    initializeCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getEventPosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return [clientX - rect.left, clientY - rect.top];
    }

    startDrawing(e) {
        this.ctx.beginPath();
        const [x, y] = this.getEventPosition(e);
        this.ctx.moveTo(x, y);
    }

    draw(e) {
        const [x, y] = this.getEventPosition(e);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.initializeCanvas();
    }

    createInputTensor() {
        return tf.tidy(() => {
            const smallCanvas = document.createElement('canvas');
            smallCanvas.width = CONFIG.CANVAS_SIZE;
            smallCanvas.height = CONFIG.CANVAS_SIZE;
            const sctx = smallCanvas.getContext('2d');
            sctx.drawImage(this.canvas, 0, 0, CONFIG.CANVAS_SIZE, CONFIG.CANVAS_SIZE);

            const imgData = sctx.getImageData(0, 0, CONFIG.CANVAS_SIZE, CONFIG.CANVAS_SIZE);
            let data = tf.browser.fromPixels(imgData).toFloat();
            data = data.div(255.0).expandDims(0);
            return data;
        });
    }
}