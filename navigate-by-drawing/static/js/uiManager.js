import { classes, iconMap, navigationMap } from './config.js';

export class UIManager {
    constructor() {
        this.currentSection = "home-section";
        this.elements = {
            predictionResult: document.getElementById('prediction-result'),
            result: document.getElementById('result'),
            helpModal: document.getElementById('help-modal')
        };
    }

    updatePredictionBars(predictions) {
        classes.forEach((cls, i) => {
            const prob = predictions[i];
            const iconId = iconMap[cls];
            const bar = document.getElementById(`bar-${iconId}`);
            if (bar) {
                bar.style.width = `${(prob * 100).toFixed(1)}%`;
            }
        });
    }

    resetPredictionBars() {
        Object.values(iconMap).forEach(iconId => {
            const bar = document.getElementById(`bar-${iconId}`);
            if (bar) {
                bar.style.width = '0%';
            }
        });
    }

    updatePredictionText(bestClass, maxProb) {
        const resultText = `${bestClass} (${(maxProb * 100).toFixed(1)}%)`;
        this.elements.predictionResult.textContent = resultText;
    }

    resetPredictionText() {
        this.elements.predictionResult.textContent = 'Draw an icon to navigate';
    }

    updateModelStatus(message) {
        this.elements.result.textContent = message;
    }

    navigateToSection(iconClass) {
        const targetSection = navigationMap[iconClass];
        
        if (!targetSection || targetSection === this.currentSection) {
            return;
        }

        console.log(`Navigating to section: ${targetSection}`);

        // Hide current section
        const currentElement = document.getElementById(this.currentSection);
        if (currentElement) {
            currentElement.classList.add('hidden');
        }

        // Show target section
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.remove('hidden');
            this.currentSection = targetSection;
            console.log(`Current section updated to: ${this.currentSection}`);
        }
    }

    toggleHelpModal(show) {
        this.elements.helpModal.classList.toggle('hidden', !show);
    }
}