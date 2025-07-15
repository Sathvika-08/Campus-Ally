📌 Campus Ally
Campus Ally is a student-focused web application designed to centralize campus communication and promote mental wellness. Built using React, Firebase, and Gemini API, it helps students stay updated with events, check in on their emotional state, and interact with an intelligent AI chatbot — all in one place.

🚀 Features
🧠 AI Chatbot
Ask general or campus-related questions. Responses are powered by Google’s Gemini API.

🧘 Wellness Form
A simple form asks students how they’re feeling and provides motivational messages via AI.

📅 Events Dashboard
Displays upcoming campus and GDG events using data from Firebase Firestore.

🔐 Authentication
Email-based sign-up/login using Firebase Authentication.

Technologies Used
React (frontend framework)

Firebase Authentication (secure login)

Firebase Firestore (event data storage)

Google Gemini API (chatbot + wellness message generation)

🚀 Getting Started

Follow these steps to run the project locally on your system.
# 1. Clone the Repository
```bash
git clone https://github.com/your-username/campus-ally.git
cd campus-ally
```

# 2. Install Dependencies
```bash
npm install
```

# 3. Set Up Environment Variables
Create a .env file in the root directory and paste the following with your actual credentials:

# 4. Start the Application (in 2 terminals)
  Terminal 1 – Start the Genkit Gemini backend:
  ```bash
  npm run genkit:dev
  ```
  Terminal 2 – Start the React frontend (Vite):
  ```bash
  npm run dev
  ```
# 5. Access the App






