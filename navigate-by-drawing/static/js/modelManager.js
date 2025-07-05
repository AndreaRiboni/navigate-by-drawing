import { CONFIG, classes } from './config.js';

export class ModelManager {
    constructor() {
        this.model = null;
    }

    async loadModel() {
        try {
            this.model = await tf.loadLayersModel(CONFIG.MODEL_PATH);
            console.log('Model loaded successfully');
            return { success: true, message: '✅ Model loaded!' };
        } catch (error) {
            console.error('Error loading model:', error);
            return { success: false, message: '❌ Failed to load model' };
        }
    }

    async predict(inputTensor) {
        if (!this.model) {
            throw new Error('Model not loaded');
        }

        try {
            const prediction = await this.model.predict(inputTensor).data();
            return this.findBestPrediction(prediction);
        } catch (error) {
            console.error('Prediction error:', error);
            throw error;
        }
    }

    findBestPrediction(predictions) {
        let maxProb = 0;
        let bestClass = "";
        
        classes.forEach((cls, i) => {
            const prob = predictions[i];
            if (prob > maxProb) {
                maxProb = prob;
                bestClass = cls;
            }
        });
        
        return { 
            bestClass, 
            maxProb, 
            predictions,
            shouldNavigate: maxProb > CONFIG.CONFIDENCE_THRESHOLD
        };
    }
}