# Music Transfer Web Application

This project allows users to transfer their music from Yandex.Music to Spotify using a React frontend and a Python backend built with Flask.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Python 3.9+**
- **Node.js 16+**
- **npm** (comes with Node.js)

---

## Backend Setup (Python Flask Server)

1. **Install Python**  
   Download and install Python from the [official website](https://www.python.org/). Ensure Python is added to your system's PATH.

2. **Install Dependencies**  
   Open a terminal and run the following commands:

   ```bash
   pip install flask flask-cors
   pip install git+https://github.com/MarshalX/yandex-music-api.git
   ```

Run the Server
To start the Flask server, execute:

bash
python app.py
By default, the server runs on http://localhost:5000.

Install Node.js
Download and install Node.js from the official website.

Install Dependencies
Navigate to the project folder and run:

bash
npm install
Start the React Application
To launch the frontend, execute:

bash
npm start
By default, the application will be available at http://localhost:3000.
