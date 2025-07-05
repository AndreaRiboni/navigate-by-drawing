// Configuration constants
export const CONFIG = {
    CANVAS_SIZE: 32,
    LINE_WIDTH: 12,
    CONFIDENCE_THRESHOLD: 0.9,
    MODEL_PATH: '/icon_classifier/tfjs-icon-classifier.json'
};

export const classes = ["book", "envelope", "home", "person", "suitcase", "x"];

export const iconMap = {
    "book": "book",
    "envelope": "email", 
    "home": "home",
    "person": "person",
    "suitcase": "bag",
    "x": "close"
};

export const navigationMap = {
    "home": "home-section",
    "envelope": "contact-section", 
    "suitcase": "cv-section",
    "person": "bio-section",
    "book": "education-section",
    "x": "tutorial-section"
};