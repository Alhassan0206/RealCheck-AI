# RealCheck - Authenticity Scanner + Brand Design Studio

## Overview
RealCheck is a mobile application (iOS + Android) providing dual-core services:
1. **Authenticity Scanner** - AI-powered fake/real verification
2. **Brand Design Studio** - AI-assisted poster/flyer generation with mobile editor

## Project Structure
```
├── mobile/                # React Native (Expo) frontend
│   ├── App.js            # Main app with navigation
│   ├── src/
│   │   └── screens/      # 25+ screen components
│   └── package.json
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── index.js      # Express server entry
│   │   └── routes/       # API endpoints
│   └── package.json
├── stitch_splash_screen/  # Original HTML mockups
└── Requirements.md        # Product requirements document
```

## Tech Stack
- **Frontend**: React Native with Expo (web support)
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Backend**: Node.js + Express
- **Authentication**: Google OAuth + JWT

## Running the App

### Web Development
```bash
cd mobile && npm install && npm run web
```
The app runs on port 5000 for web preview.

### Backend API
```bash
cd backend && npm install && npm start
```
Backend runs on port 3001.

## Key Features
- 32 screens following PRD specification
- Bottom navigation: Home, Scan, Create, History, Profile
- Pre-auth screens (Splash, Welcome, Sign In) without bottom nav
- Full-screen Editor hides bottom nav

## Third-Party Integrations (Planned)
1. Poster Generation: OpenAI, Replicate, Nano Banana
2. Authenticity Scan: Hive AI
3. Authentication: Google OAuth
4. Payments: Stripe + Paystack
5. Storage: Supabase
6. Analytics: Firebase
7. Image Processing: remove.bg

## Recent Changes
- Initial React Native setup with Expo
- All 25+ screens implemented
- Navigation structure complete
- Backend API foundation ready
