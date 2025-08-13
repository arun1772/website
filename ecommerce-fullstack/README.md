# 🛒 E-commerce Platform with Real-time Tracking

A complete full-stack e-commerce platform with React.js frontend and Node.js backend featuring real-time order tracking, social authentication, and comprehensive admin dashboard.

## 🚀 Features

### Frontend
- 🎨 Modern React.js 18 with TypeScript
- 🛒 Complete e-commerce functionality (product catalog, cart, checkout)
- 🔐 Authentication with social login (Google, Facebook, GitHub)
- 📱 Responsive design with Tailwind CSS
- ⚡ Real-time order tracking with Socket.IO
- 👑 Admin dashboard for order and product management
- 🔍 Advanced product search and filtering

### Backend
- ⚡ Node.js with Express and TypeScript
- 🗄️ MongoDB with Mongoose ODM
- 🔒 JWT authentication with Passport.js
- 📧 Email notifications (OTP, order updates)
- 🌐 Real-time communication with Socket.IO
- 🔐 Social authentication (Google, Facebook, GitHub)
- 📦 Order management with OTP verification

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## 🚀 Quick Start

### 1. Clone/Download the Project
```bash
cd ecommerce-fullstack
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# Start development server
npm run dev
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Default settings work for local development

# Start development server
npm run dev
```

Frontend runs on: http://localhost:5173

### 4. MongoDB Setup
- **Local MongoDB**: Make sure MongoDB is running on localhost:27017
- **MongoDB Atlas**: Update MONGODB_URI in backend/.env with your connection string

## 🔑 Default Login Credentials

- **Admin**: admin@example.com / password
- **User**: user@example.com / password

## 🔧 Configuration

### Backend Environment Variables
Edit `backend/.env`:
```env
# Required
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Optional (for social auth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optional (for email)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend Environment Variables
Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 📱 Social Authentication Setup (Optional)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API → Create OAuth 2.0 credentials
3. Add redirect URI: `http://localhost:5000/api/auth/google/callback`
4. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in backend/.env

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create app → Add Facebook Login
3. Add redirect URI: `http://localhost:5000/api/auth/facebook/callback`
4. Update FACEBOOK_APP_ID and FACEBOOK_APP_SECRET in backend/.env

### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create OAuth App
3. Set callback URL: `http://localhost:5000/api/auth/github/callback`
4. Update GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in backend/.env

## 🗂️ Project Structure

```
ecommerce-fullstack/
├── frontend/                 # React.js Frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── backend/                  # Node.js Backend
│   ├── src/
│   │   ├── config/          # Database & Passport config
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utilities
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🎯 Key Features

1. **Real-time Order Tracking**: Live updates using Socket.IO
2. **Social Authentication**: Google, Facebook, GitHub login
3. **OTP Verification**: Email-based order confirmation
4. **Admin Dashboard**: Complete order and product management
5. **Responsive Design**: Works on all devices
6. **Type Safety**: Full TypeScript implementation

## 🛠️ Development Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start           # Start production server
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🚀 Production Deployment

### Backend
1. Set NODE_ENV=production
2. Configure production MongoDB URI
3. Set secure JWT secret
4. Configure email/SMS services
5. Deploy to your hosting provider

### Frontend
1. Update API URLs to production backend
2. Run `npm run build`
3. Deploy the `dist` folder to your hosting provider

## 📞 Support

For issues or questions, please check the code comments or create an issue.

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.