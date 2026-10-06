# BhashaBridge — Complete AI Translation Application

BhashaBridge is a full-stack, context-aware translation web application focused on English and Indian languages. The application includes a premium single-page UI, Express/MongoDB backend, Groq-powered AI translation/context analysis, transliteration output, conversation mode, browser speech input/output, speech/conversation workflows, history and saved translations.

## Current working AI pipeline

```text
User text
  ↓
Express /api/translate
  ↓
Language detection
  ↓
Groq context analysis
  ↓
Groq AI translation
  ↓
Native translation + Roman transliteration + meaning + explanation + confidence
  ↓
MongoDB history (per browser client ID)
```

## Supported languages

English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese and Urdu.

## Requirements

- Node.js 18+
- MongoDB Atlas (or another MongoDB instance)
- Groq API key

## Setup on Windows

1. Open PowerShell in the project folder.
2. Copy the environment template:

```powershell
Copy-Item backend\.env.example backend\.env
```

3. Open `backend/.env` and set:

```env
DEMO_MODE=false
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

Do not commit or publicly share `backend/.env`.

4. Install dependencies:

```powershell
cd backend
npm install
```

5. Start the application:

```powershell
npm start
```

6. Open:

`http://localhost:5000`

The backend serves the frontend, so no second frontend server is required.

## Quick health check

Open `http://localhost:5000/api/health`. A working production configuration should report:

```json
{"status":"ok","demoMode":false}
```

## Test the translation API

```powershell
$body = @{ text="How are you?"; sourceLang="en"; targetLang="te"; domain="General"; tone="Friendly"; style="Natural"; history=@() } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/translate" -Method POST -ContentType "application/json" -Headers @{"X-Client-Id"="demo-client"} -Body $body
```

## Features

- Context-aware text translation
- 13 supported languages including English
- Auto language detection for common Indian scripts and English
- Groq AI context analysis
- Groq AI translation
- Roman transliteration returned by the AI
- Tone, style and domain controls
- Translation explanation and meaning
- Confidence score
- Conversation mode with previous-message context
- Browser microphone speech recognition when supported
- Browser text-to-speech playback
- Image upload/preview workflow
- Document upload workflow
- MongoDB translation history using an anonymous browser client ID (no login required)
- Local saved translations
- Copy, share and listen controls
- Responsive desktop/mobile interface

## Important provider note

The text/context AI pipeline is live when `DEMO_MODE=false` and `GROQ_API_KEY` is configured. Speech recognition/playback uses browser capabilities. Image OCR and document extraction are provider-adapter areas and should be connected to a production OCR/document provider (for example, BHASHINI/ULCA or another licensed service) before claiming full production multimodal coverage.

## Security

- Keep all API keys on the backend.
- Never put Groq/MongoDB credentials in frontend code.
- Use a strong `JWT_SECRET` if authentication is enabled later.
- Restrict CORS to the production frontend domain before deployment.
- Rotate any API key that has been exposed publicly.

## Project structure

```text
BhashaBridge-Complete-Ready/
├── frontend/
│   └── index.html
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── groq.service.js
│   │   ├── context.service.js
│   │   ├── language.service.js
│   │   └── translation.service.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── start.bat
├── start.ps1
└── README.md
```
