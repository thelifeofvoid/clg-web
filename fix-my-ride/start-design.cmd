@echo off
setlocal
cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies...
  call pnpm install --frozen-lockfile
  if errorlevel 1 pause & exit /b 1
)

start "Sachin Kekan Design Preview" /min node "%~dp0node_modules\vite\bin\vite.js" --host 127.0.0.1
timeout /t 2 /nobreak >nul
start "" "http://localhost:5173"

echo Design preview opened at http://localhost:5173
echo Close the minimized preview window to stop it.
pause
