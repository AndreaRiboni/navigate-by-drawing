import { CanvasUtils } from './canvasUtils.js';
import { ModelManager } from './modelManager.js';
import { UIManager } from './uiManager.js';

class IconClassifierApp {
    constructor() {
        this.state = {
            hoveringCanvas: false,
            drawing: false
        };

        // Initialize components
        this.canvas = document.getElementById('draw-canvas');
        this.canvasUtils = new CanvasUtils(this.canvas);
        this.modelManager = new ModelManager();
        this.uiManager = new UIManager();

        // DOM elements
        this.elements = {
            clearBtn: document.getElementById('clear-btn'),
            helpBtn: document.getElementById('help-btn'),
            closeHelp: document.getElementById('close-help'),
            helpModal: document.getElementById('help-modal')
        };
    }

    // Drawing event handlers
    startDrawing = (e) => {
        this.state.drawing = true;
        this.canvasUtils.startDrawing(e);
    }

    draw = (e) => {
        if (!this.state.drawing) return;
        this.canvasUtils.draw(e);
    }

    stopDrawing = () => {
        if (this.state.drawing) {
            this.state.drawing = false;
            this.predict();
        }
    }

    clearCanvas = () => {
        this.canvasUtils.clear();
        this.uiManager.resetPredictionText();
        this.uiManager.resetPredictionBars();
    }

    async predict() {
        if (!this.modelManager.model) return;

        const inputTensor = this.canvasUtils.createInputTensor();
        
        try {
            const result = await this.modelManager.predict(inputTensor);
            const { bestClass, maxProb, predictions, shouldNavigate } = result;
            
            this.uiManager.updatePredictionBars(predictions);
            this.uiManager.updatePredictionText(bestClass, maxProb);

            if (shouldNavigate) {
                this.uiManager.navigateToSection(bestClass);
            }
        } catch (error) {
            console.error('Prediction error:', error);
        } finally {
            inputTensor.dispose();
        }
    }

    async loadModel() {
        const result = await this.modelManager.loadModel();
        this.uiManager.updateModelStatus(result.message);
    }

    setupEventListeners() {
        // Canvas drawing events
        this.canvas.addEventListener('mousedown', this.startDrawing);
        this.canvas.addEventListener('touchstart', (e) => {
            this.startDrawing(e);
            e.preventDefault();
        }, { passive: false });

        this.canvas.addEventListener('mousemove', this.draw);
        this.canvas.addEventListener('touchmove', (e) => {
            this.draw(e);
            e.preventDefault();
        }, { passive: false });

        this.canvas.addEventListener('mouseup', this.stopDrawing);
        this.canvas.addEventListener('mouseleave', () => {
            this.stopDrawing();
            this.state.hoveringCanvas = false;
        });
        this.canvas.addEventListener('touchend', this.stopDrawing);
        this.canvas.addEventListener('mouseenter', () => {
            this.state.hoveringCanvas = true;
        });

        // UI controls
        this.elements.clearBtn.addEventListener('click', this.clearCanvas);
        this.elements.helpBtn.addEventListener('click', () => this.uiManager.toggleHelpModal(true));
        this.elements.closeHelp.addEventListener('click', () => this.uiManager.toggleHelpModal(false));

        // Close modal on outside click
        this.elements.helpModal.addEventListener('click', (e) => {
            if (e.target === this.elements.helpModal) {
                this.uiManager.toggleHelpModal(false);
            }
        });
    }

    async init() {
        this.setupEventListeners();
        await this.loadModel();
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new IconClassifierApp();
    app.init();
});