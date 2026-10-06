@echo off
cd /d "%~dp0backend"
if not exist .env (
  copy .env.example .env >nul
  echo Created backend\.env from the example.
  echo Add your MongoDB URI and Groq API key, then run start.bat again.
  pause
  exit /b 0
)
if not exist node_modules (
  echo Installing backend dependencies...
  call npm install
)
echo.
echo BhashaBridge is starting at http://localhost:5000
echo Press Ctrl+C to stop.
npm start
