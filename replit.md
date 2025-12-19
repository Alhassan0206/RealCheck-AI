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
│   │   └── screens/      # 32 screen components (COMPLETE)
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
- **Database**: PostgreSQL (Drizzle ORM)

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

## Complete Screen Coverage (32 Screens)

### Phase 0: Pre-Authentication (Screens 1–3)
- Screen 1: Splash Screen ✓
- Screen 2: Welcome / Intro ✓
- Screen 3: Sign In / Sign Up ✓

### Phase 1: Main App (Screens 4–32)

#### Tab 1: Home (Screens 4–8)
- Screen 4: Home Dashboard ✓
- Screen 5: Notifications ✓
- Screen 6: Feature Highlights ✓ (NEW)
- Screen 7: Credit Status ✓
- Screen 8: Home Search ✓

#### Tab 2: Scan (Screens 9–12, 29, 30)
- Screen 9: Scan Upload ✓
- Screen 10: Scan Processing ✓
- Screen 11: Scan Result (Real) ✓
- Screen 12: Scan Detail (History) ✓
- Screen 29: Counterfeit Result (FAKE) ✓ (NEW)
- Screen 30: Scan Error / Timeout ✓ (NEW)

#### Tab 3: Create (Screens 13–19)
- Screen 13: Create Entry ✓
- Screen 14: Template Selection ✓
- Screen 15: Prompt & Brand Input ✓
- Screen 16: Generation Processing ✓
- Screen 17: Preview Output ✓
- Screen 18: Editor (Full Screen) ✓
- Screen 19: Save & Share ✓

#### Tab 4: History (Screens 20–22, 32)
- Screen 20: History Overview ✓
- Screen 21: History Item Detail ✓
- Screen 22: Bulk Actions ✓
- Screen 32: Export Options Modal ✓ (NEW)

#### Tab 5: Profile (Screens 23–28, 31)
- Screen 23: Profile Overview ✓
- Screen 24: Brand Kit List ✓
- Screen 25: Brand Kit Editor ✓
- Screen 26: Subscription & Billing ✓
- Screen 27: Settings ✓
- Screen 28: Support & Feedback ✓
- Screen 31: Edit Profile ✓

## Database Schema (Complete)
- **users** - User accounts with credits and plan
- **scans** - Authenticity scan history with results
- **designs** - Generated poster/flyer designs
- **brandKits** - Reusable branding elements
- **creditTransactions** - Credit usage tracking
- **notifications** - User notifications
- **subscriptions** - Subscription plans
- **templates** - Design templates

## Backend API Endpoints
- Auth: Google OAuth, Token verification
- Users: Profile management, email/name updates
- Scans: Upload, analyze, history
- Designs: Generate, retrieve, save
- Credits: Balance, packages, purchases
- Brand Kits: CRUD operations
- Notifications: Get user notifications
- Templates: Get available templates

## Third-Party Integrations (Architecture Ready)
1. **Poster Generation**: OpenAI, Replicate, Nano Banana
2. **Authenticity Scan**: Hive AI (forensics + synthetic media detection)
3. **Authentication**: Google OAuth
4. **Payments**: Stripe + Paystack
5. **Storage**: Supabase
6. **Analytics**: Firebase
7. **Image Processing**: remove.bg

## Recent Changes (Completed)
- ✅ All 32 screens implemented
- ✅ Complete navigation structure with bottom tabs
- ✅ Pre-auth flow without bottom navigation
- ✅ Full-screen editor with hidden bottom nav
- ✅ Feature Highlights screen added
- ✅ Counterfeit Result screen added
- ✅ Scan Error/Timeout screen added
- ✅ Export Options modal added
- ✅ Backend API framework with routes
- ✅ Database schema with all tables
- ✅ Authentication middleware setup

## Status
🚀 **MVP COMPLETE** - All 32 screens implemented with full navigation structure. Ready for API integration with third-party services and testing.
