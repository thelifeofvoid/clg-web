@echo off
setlocal
cd /d "%~dp0"

echo Building the website...
call pnpm run build
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)

set "NODE_ENV=production"
start "Sachin Kekan Website" /min node "%~dp0dist-server\index.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3001"

echo Full website opened at http://localhost:3001
echo Close the minimized website window to stop it.
pause
