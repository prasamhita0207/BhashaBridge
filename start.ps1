Set-Location "$PSScriptRoot\backend"
if (!(Test-Path .env)) {
  Copy-Item .env.example .env
  Write-Host "Created backend\.env from the example." -ForegroundColor Yellow
  Write-Host "Add your MongoDB URI and Groq API key, then run this script again." -ForegroundColor Yellow
  exit 0
}
if (!(Test-Path node_modules)) {
  Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
  npm install
}
Write-Host ""
Write-Host "BhashaBridge is starting at http://localhost:5000" -ForegroundColor Cyan
npm start
