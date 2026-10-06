# BhashaBridge — Submission / Demo Notes

## What this package contains

This package contains the complete source code for the BhashaBridge web application, including the frontend, Express backend, MongoDB integration, Groq AI translation/context integration, conversation workflow, speech UI, speech/conversation workflows, history and saved translations.

## To run the application

1. Install Node.js 18+.
2. Open PowerShell in the project folder.
3. Run `Copy-Item backend\\.env.example backend\\.env`.
4. Put valid MongoDB and Groq credentials into `backend/.env`.
5. Run `cd backend` then `npm install`.
6. Run `npm start`.
7. Open `http://localhost:5000`.

## Demo test

Use the Translator page with:
- Source: Auto detect or English
- Target: Telugu
- Text: `How are you?`
- Tone: Friendly
- Style: Natural

The application should return a Telugu translation plus Roman transliteration, context, meaning, explanation and confidence.

## Credential safety

`backend/.env` is intentionally not included in the submission archive. Credentials must be supplied securely on the machine used for the demo. Never place API keys in `frontend/index.html`.
