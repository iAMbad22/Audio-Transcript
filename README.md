# Audio Transcript Project

This project allows users to record audio, transcribe it using the Deepgram API, and save the transcriptions to a MongoDB database. It consists of a backend built with Express.js and a frontend built with React.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (either local or hosted)
- Deepgram API Key

## Setup Instructions

### Backend Setup

1. **Clone the Repository**

   ```sh
   git clone git@github.com:iAMbad22/Audio-Transcript.git
   cd Audio-Transcript/server

2. **Install Backend Dependencies**
    npm install

3. **Create .env File**
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    DEEPGRAM_API_KEY=your_deepgram_api_key

4. **Start the Backend Server**
    node index.js


**Frontend Setup**

**Navigate to the Frontend Directory**
    sh
    cd ../client



**Install Frontend Dependencies**

    sh

    npm install

**Start the Frontend Server**
    sh

    npm run dev


**Usage**
    Open the Frontend

    Open your web browser and navigate to http://localhost:3000. or random port which will be specified in the terminal

    Record Audio

    Use the microphone button to start and stop recording audio.

    Save Transcription

    After recording, click the "Save Transcript" button to save the transcription to the database.

    View Transcriptions

    You can view all saved transcriptions below the recording interface.


Audio-Transcript/
├── Frontend/                   # Frontend code (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── ...
├── server/                   # Backend code (Express.js)
│   ├── routes/
│   │   ├── audioRoutes.js
│   │   └── index.js
│   ├── models/
│   │   └── Transcript.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── ...
└── README.md                 # Project documentation


**Troubleshooting**

- 1.If you encounter issues with the backend, make sure your MongoDB URI and Deepgram API key are correctly set in the .env file.
- 2.Ensure MongoDB is running and accessible.
- 3.Make sure you have the latest version of Node.js and npm installed. END


***END***