# 🛡️ React Native Password Generator

A sleek, professional, and highly customizable password generator built with **React Native**. This app ensures security by allowing users to generate complex passwords based on their specific needs, all wrapped in a beautiful UI with an abstract background.

## ✨ Features

* **Custom Length:** Generate passwords from 6 to 100 characters.
* **Granular Control:** Toggle between Uppercase, Lowercase, Numbers, and Special Symbols.
* **Real-time Validation:** Powered by **Yup** and **Formik** for robust input handling and error messaging.
* **Modern UI:** Features a blurred image background and elegant glassmorphism-inspired input fields.
* **Copy to Clipboard:** Selectable result text for quick use.

## 🛠️ Tech Stack

* **Framework:** React Native (Expo/CLI)
* **Form Management:** Formik
* **Schema Validation:** Yup
* **Components:** React Native Bouncy Checkbox, Safe Area Context

## 🚀 Getting Started

### Prerequisites

* Node.js
* React Native Environment setup

### Installation

1.  **Clone the repo:**
    ```bash
    git clone 
    
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Run the app:**
    ```bash
    npx react-native start
    ```

## 📸 Preview Logic

The app uses a mathematical random distribution to pick characters from a combined string based on user preferences:

* **Logic:** `Math.floor(Math.random() * characterList.length)`
* **Validation:** Ensuring length requirements are met before generation.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

---

**Developed with ❤️ by [Muhammad UMER AZIZ]