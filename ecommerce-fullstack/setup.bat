@echo off
echo 🚀 Setting up E-commerce Full-stack Application...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (v16 or higher) and try again.
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend

if not exist ".env" (
    echo 📄 Creating backend .env file...
    copy .env.example .env >nul 2>&1
)

echo 📥 Installing backend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed successfully
cd ..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd frontend

if not exist ".env" (
    echo 📄 Creating frontend .env file...
    copy .env.example .env >nul 2>&1
)

echo 📥 Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed successfully
cd ..

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Make sure MongoDB is running (local or cloud)
echo 2. Update environment variables in backend\.env if needed
echo 3. Start the backend: cd backend ^&^& npm run dev
echo 4. Start the frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 URLs:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo Happy coding! 🚀
pause