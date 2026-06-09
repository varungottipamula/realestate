@echo off
echo ==============================================
echo  Elite Estates - Auto Startup Script
echo ==============================================
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo [System] node_modules not found. Installing dependencies...
    call npm install
) else (
    echo [System] Dependencies verified.
)

echo.
echo [System] Starting backend server...
start http://localhost:3000
node server.js
