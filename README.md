# Weather App

A minimalist **Node.js** web application that provides **real-time weather updates**. By default, it displays weather information for **Istanbul**, but users can also retrieve their **current location weather** and other searched cities weather.  

---

## Features

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **EJS**: A simple templating language that lets you generate HTML markup with plain JavaScript.
- **Axios**: A promise-based HTTP client for making API calls.
- **OpenWeather API**: Provides the weather data.
- **Environment Variables**: API keys are securely managed with a `.env` file, ensuring they are not hardcoded.
- **Docker Support**: Containerized deployment is available for easy setup and scaling. 🐳

---

## Installation

To set up and run the application locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/emregokyar/weather-cast.git
    cd weather-cast
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add your OpenWeather API key:

    ```bash
    API_KEY=your_openweather_api_key
    ```

4.  **Run the application:**

    ```bash
    npm start
    ```

The app will be accessible at `http://localhost:3000`.

---

## Running with Docker

Alternatively, you can run the application using DockerHub.

1.  **Using the Docker image:**

    ```bash
    docker pull emregokyar/weather-app:mc
    ```

2.  **Run the container:**

    ```bash
    docker run -p 3000:3000 -e API_KEY=your_openweather_api_key emregokyar/weather-app:mc
    ```

---

## Technologies

- **Node.js**: The JavaScript runtime environment.
- **Express.js**: The web framework used to build the application.
- **EJS**: The templating engine for rendering dynamic views.
- **Axios**: The HTTP client for fetching API data.
- **Bootstrap**: The front-end framework for styling and responsiveness.
- **Docker**: The platform for containerization.

---

## Media



https://github.com/user-attachments/assets/2cf01c56-e735-42be-9214-8a1233e18f2c



