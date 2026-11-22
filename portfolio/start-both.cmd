@echo off
setlocal
cd /d "%~dp0"
title Sachin Kekan - Start Both Websites

where pnpm >nul 2>&1
if errorlevel 1 (
  echo pnpm was not found. Install Node.js from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

set "PORTFOLIO_DIR=%~dp0"
set "FIX_RIDE_DIR=%~dp0..\fix-my-ride"
if not exist "%FIX_RIDE_DIR%\package.json" set "FIX_RIDE_DIR=C:\Users\ADMIN\Documents\Codex\2026-11-20\make-an-website-for-myself-look\outputs\personal-website"

if not exist "%PORTFOLIO_DIR%node_modules\.bin\vite.cmd" (
  echo Installing portfolio dependencies...
  pushd "%PORTFOLIO_DIR%"
  call pnpm install --frozen-lockfile
  if errorlevel 1 (
    popd
    echo Portfolio dependency installation failed.
    pause
    exit /b 1
  )
  popd
)

if not exist "%FIX_RIDE_DIR%\package.json" (
  echo Fix My Ride project was not found at:
  echo %FIX_RIDE_DIR%
  pause
  exit /b 1
)

if not exist "%FIX_RIDE_DIR%\node_modules\.bin\vite.cmd" (
  echo Installing Fix My Ride dependencies...
  pushd "%FIX_RIDE_DIR%"
  call pnpm install --frozen-lockfile
  if errorlevel 1 (
    popd
    echo Fix My Ride dependency installation failed.
    pause
    exit /b 1
  )
  popd
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok=$false; try {$page=Invoke-WebRequest -Uri 'http://127.0.0.1:5173/' -UseBasicParsing -TimeoutSec 1; $ok=$page.Content -match 'Fix My Ride'} catch {}; if($ok){exit 0}else{exit 1}"
if errorlevel 1 (
  echo Starting Fix My Ride on http://localhost:5173 ...
  start "Fix My Ride Server" /min cmd /k "cd /d ""%FIX_RIDE_DIR%"" && pnpm dev"
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok=$false; try {$page=Invoke-WebRequest -Uri 'http://127.0.0.1:5174/' -UseBasicParsing -TimeoutSec 1; $ok=$page.Content -match 'Sachin Kekan'} catch {}; if($ok){exit 0}else{exit 1}"
if errorlevel 1 (
  echo Starting portfolio on http://localhost:5174 ...
  start "Portfolio Server" /min cmd /k "cd /d ""%PORTFOLIO_DIR%"" && pnpm dev"
)

echo Waiting for both websites...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ready5173=$false; $ready5174=$false; for($i=0; $i -lt 40 -and (-not $ready5173 -or -not $ready5174); $i++){ try {$a=Invoke-WebRequest -Uri 'http://127.0.0.1:5173/' -UseBasicParsing -TimeoutSec 1; $ready5173=$a.Content -match 'Fix My Ride'} catch {}; try {$b=Invoke-WebRequest -Uri 'http://127.0.0.1:5174/' -UseBasicParsing -TimeoutSec 1; $ready5174=$b.Content -match 'Sachin Kekan'} catch {}; if(-not $ready5173 -or -not $ready5174){Start-Sleep -Milliseconds 500} }; if($ready5173 -and $ready5174){exit 0}else{exit 1}"
if errorlevel 1 (
  echo One or both websites did not start. Check the minimized server windows for details.
  pause
  exit /b 1
)

echo Opening both websites...
start "" "http://localhost:5173/"
start "" "http://localhost:5174/"
echo Fix My Ride: http://localhost:5173/
echo Portfolio:   http://localhost:5174/
endlocal
