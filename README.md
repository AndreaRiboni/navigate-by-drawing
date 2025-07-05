# Navigate by Drawing

A UI/UX experiment that lets you navigate a website by drawing icons on a canvas. Powered by a lightweight TensorFlow\.js CNN model, this project demonstrates how AI can enable creative, intuitive web navigation.

---

## 🚀 Features

* **Draw to Navigate:** Move between sections by sketching simple icons (home, envelope, person, suitcase, book, X) on the canvas.
* **Real-Time AI Recognition:** A TensorFlow\.js model predicts your drawing and navigates automatically if confidence > 90%.
* **Modern UI:** Built with Tailwind CSS for a clean, responsive, and accessible interface.
* **No Backend Required:** Fully static, runs in any modern browser.

---

## 🖼️ Demo

[https://private-user-images.githubusercontent.com/39545859/462752659-4ffb8cb0-9314-426d-963b-ecf26a7a16ec.webm?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTE3MDkwOTAsIm5iZiI6MTc1MTcwODc5MCwicGF0aCI6Ii8zOTU0NTg1OS80NjI3NTI2NTktNGZmYjhjYjAtOTMxNC00MjZkLTk2M2ItZWNmMjZhN2ExNmVjLndlYm0_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzA1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcwNVQwOTQ2MzBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMWQ1MjNiZWQ2YzIzMTljZTBkYWEwMGFjMjk0OGQ3YjkxOTZjZDVhMGIxYzZiZWYzODM4OWU2YWQ5MzBjZGI1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.B-QJXQesJK3SNo7F-NTaOWzMcFnQlcuKg5_wMWu3qkQ](https://private-user-images.githubusercontent.com/39545859/462752659-4ffb8cb0-9314-426d-963b-ecf26a7a16ec.webm?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTE3MDkwOTAsIm5iZiI6MTc1MTcwODc5MCwicGF0aCI6Ii8zOTU0NTg1OS80NjI3NTI2NTktNGZmYjhjYjAtOTMxNC00MjZkLTk2M2ItZWNmMjZhN2ExNmVjLndlYm0_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzA1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcwNVQwOTQ2MzBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMWQ1MjNiZWQ2YzIzMTljZTBkYWEwMGFjMjk0OGQ3YjkxOTZjZDVhMGIxYzZiZWYzODM4OWU2YWQ5MzBjZGI1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.B-QJXQesJK3SNo7F-NTaOWzMcFnQlcuKg5_wMWu3qkQ)

---

## ✨ How It Works

1. **Draw an Icon:** Use your mouse or finger to draw on the canvas.
2. **AI Prediction:** The model classifies your drawing in real time.
3. **Automatic Navigation:** If the model is >90% confident, you're taken to the corresponding section.
4. **Supported Icons:**

   * Home
   * Envelope (Contact)
   * Person (Bio)
   * Suitcase (CV)
   * Book (Education)
   * X (Tutorial)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AndreaRiboni/navigate-by-drawing.git
cd navigate-by-drawing
```

### 2. Serve the App

You can run a static server locally or use Docker.

#### Option A: Python Static Server

```bash
cd navigate-by-drawing/static
python -m http.server 8001
```

Then open [http://localhost:8001](http://localhost:8001) in your browser.

#### Option B: Docker + Caddy

```bash
docker-compose up --build
```

Then visit [http://localhost:8001](http://localhost:8001).

---

## 🧠 Model

* **Type:** Convolutional Neural Network (CNN)
* **Framework:** TensorFlow\.js
* **Input:** 32x32 RGB images (downsampled from canvas)
* **Classes:** `book`, `envelope`, `home`, `person`, `suitcase`, `x`
* **Files:**

  * `tfjs-icon-classifier.json`
  * `tfjs-icon-classifier.weights.bin`

### Model Architecture

```text
Input: 32x32x3 RGB
└── Conv2D(32 filters, 3x3, ReLU)
    └── MaxPooling2D(2x2)
        └── Conv2D(64 filters, 3x3, ReLU)
            └── MaxPooling2D(2x2)
                └── Flatten
                    └── Dropout(0.3)
                        └── Dense(64, ReLU)
                            └── Dense(6, Softmax)
```

---

## 📝 Customization

### Add or Change Icons

Edit `js/config.js` to update:

* List of supported classes
* Icon-image mapping
* Navigation targets

### Replace the Model

Replace the model files in `static/icon_classifier/` if you train a new one.

---

## 📚 Dataset

The dataset used to train the icon classifier is publicly available on Kaggle:

**Kaggle:** [Navigation Icons Dataset](https://www.kaggle.com/datasets/andreariboni/navigation-icons/)

---

## 📄 License

MIT License. See [LICENSE](LICENSE).

---

## 🙋‍♂️ Contact

* GitHub: [AndreaRiboni](https://github.com/AndreaRiboni)
* LinkedIn: [Andrea Riboni](https://www.linkedin.com/in/andreariboni/)

---

## 📣 Contributing

Pull requests and suggestions are welcome! Open an issue or submit a PR.
