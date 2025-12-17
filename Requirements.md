📘 Product Requirements Document (PRD) — RealCheck v1.0 (32 Screens)
This document has been updated to reflect the full 32-screen layout derived from the provided visual wireframe, integrating all critical functional requirements and navigation flows.
Project Title: RealCheck — Authenticity Scanner + Brand Design Studio
Platform: Mobile App (iOS + Android)
Version: 1.0 (MVP)
1. Product Overview
RealCheck provides a dual-core service: Authenticity Scanner (AI-powered fake/real verification) and a Brand Design Studio (AI-assisted poster/flyer generation with a mobile editor).
2. Core Product Features
4.1 Authenticity Scanner
 * Description: AI-powered tool for verifying items, documents, or images.
 * MVP Scope: Product label/packaging analysis, Barcode/QR validation, Document/image manipulation detection, Confidence scoring, and cloud-synced Scan History.
4.2 Brand Design Studio
A hybrid system combining AI Generator, Template Library, and Manual Editor.
 * AI Generator: Creates posters/flyer concepts from text prompts or Brand Kits.
 * Template Library: Guarantees clean, professionally structured layouts by category (Restaurant, Events, Sales, etc.).
 * Manual Editor: Allows drag-and-drop customization (text, layers, images) before export (PNG/JPG/PDF).
4.3 Brand Kit System
Allows users to store reusable branding elements (Logo, Color palette, Fonts) and apply them to any design.
8. Screen Flow & Navigation Architecture (32 Screens)
The application follows a two-phase architecture. Screens 1–3 are Pre-Auth (no bottom navigation), and Screens 4–32 are the Main App (persistent bottom navigation, hidden only on the full-screen Editor).
Bottom Navigation (Persistent)
| Home | Scan | Create | History | Profile |
|---|---|---|---|---|
Phase 0: Pre-Authentication (Screens 1–3)
| ID | Screen Name | Description | Navigation Logic |
|---|---|---|---|
| 1 | Splash Screen | App logo and Loading indicator. | Auto-navigates to Welcome/Auth. (NO NAV) |
| 2 | Welcome / Intro | Value proposition slides (scan, create, brand). | CTA: "Continue." (NO NAV) |
| 3 | Sign In / Sign Up | Google OAuth button, Terms & Privacy links. | On success → enters Main App (Screen 4). (NO NAV) |
Phase 1: Main App (Screens 4–32)
Tab 1: Home (Screens 4–8)
| ID | Screen Name | Description | Access |
|---|---|---|---|
| 4 | Home Dashboard | Credit balance, Quick Actions (Scan, Create), Recent activity, Promo banners. | Default Landing |
| 5 | Notifications | Alerts for completed scans/designs, subscription renewal. | Home Header Icon |
| 6 | Feature Highlights | Banners for new AI models, new templates, promotions. | Home Section |
| 7 | Credit Status | Remaining credits, Usage breakdown, Buy credits CTA. | Home Card |
| 8 | Home Search | Search bar for scans and designs. | Home Header Icon |
Tab 2: Scan (Screens 9–12, 29, 30)
| ID | Screen Name | Description | Navigation Stack |
|---|---|---|---|
| 9 | Scan Upload | Camera/Gallery upload, Supported formats, Credit cost. | Scan Tab |
| 10 | Scan Processing | Loader, ETA, Cancel option. | From Screen 9 |
| 11 | Scan Result (Real) | High Authenticity Score (Green Badge), Hive AI breakdown. | From Screen 10 (Success) |
| 12 | Scan Detail (History) | Metadata, Timestamp, Re-run scan button. | From History Tab (Scans) |
| 29 | Counterfeit Result (FAKE) | Low Authenticity Score (Red Badge), 'FAKE' Warning, 'Report Item' CTA. (NEW) | From Screen 10 (Failure) |
| 30 | Scan Error / Timeout | Error Icon (⚠️), Message: 'Could not analyze image. Try again.' (NEW) | From Screen 10 (Timeout) |
Tab 3: Create (Screens 13–19)
| ID | Screen Name | Description | Navigation Stack |
|---|---|---|---|
| 13 | Create Entry | Choose Poster/Flyer, Aspect ratio, Output size. | Create Tab |
| 14 | Template Selection | Admin-curated templates, AI-only mode toggle, Style filters. | From Screen 13 |
| 15 | Prompt & Brand Input | Text prompt input, Brand kit selector, Color/font controls. | From Screen 14 |
| 16 | Generation Processing | Provider shown (OpenAI/Replicate), Credit usage display. | From Screen 15 |
| 17 | Preview Output | Displays multiple generated designs, Regenerate/Select buttons. | From Screen 16 |
| 18 | Editor (Full Screen) | Text edits, background removal, layers, stickers. | From Screen 17. (BOTTOM NAV HIDDEN) |
| 19 | Save & Share | Save to gallery, Export formats (PNG/JPG), Share to social. | From Screen 18 |
Tab 4: History (Screens 20–22, 32)
| ID | Screen Name | Description | Navigation Stack |
|---|---|---|---|
| 20 | History Overview | Tabs: Scans & Designs. Filters. | History Tab |
| 21 | History Item Detail | View scan or poster, Duplicate / Re-edit. | From Screen 20 |
| 22 | Bulk Actions | Select multiple items for Delete/Export. | From Screen 20 |
| 32 | Export Options Modal | Bottom-sheet overlay for selecting export format (PDF/PNG/Email). (NEW) | From Screen 21/22 |
Tab 5: Profile (Screens 23–28, 31)
| ID | Screen Name | Description | Navigation Stack |
|---|---|---|---|
| 23 | Profile Overview | User info, Current plan, Credits, Menu list (Brand Kit, Settings, etc.). | Profile Tab |
| 24 | Brand Kit List | List of saved Brand Kits (Logos, Colors, Fonts). | From Screen 23 |
| 25 | Brand Kit Editor | Upload assets, save color palettes and font presets. | From Screen 24 |
| 26 | Subscription & Billing | Plans, Upgrade/downgrade, Payment methods. | From Screen 23 |
| 27 | Settings | Notifications toggle, Analytics consent, Language, Logout. | From Screen 23 |
| 28 | Support & Feedback | FAQs, Contact support, Report issue links. | From Screen 23 |
| 31 | Edit Profile | Input fields for Full Name, Email, Password change. (NEW) | From Screen 23 |
6. Technical Architecture & Component Definitions
The Technical Architecture remains valid. The expansion to 32 screens is primarily a UI/UX concern and does not require new core services, but the Authenticity Scan Service and Credit Engine must support the logic for the new error and counterfeit screens.
 * Authenticity Scan Service (Supports S29, S30): Must return a distinct error code for a timeout (S30) or a definitive "fake" confidence level (S29).
 * User Service (Supports S31): Must handle updating the user's name and email.
 * Mobile App (Supports S32): Must implement the bottom-sheet style modal for export options.




✅ Third-Party Integration Stack (Confirmed)


1. Poster/Flyer Generation

Providers:

Replicate (Flux, SDXL, etc.)

OpenAI (GPT-Image-1)

Nano Banana (credit-based generation)

Backend Logic:

Your backend chooses the provider based on quality, cost tier, and user credits.

High-quality: OpenAI

Draft/cheap: Replicate

Subscription credits: Nano Banana

All results stored in Supabase after generation.

2. Real/Fake Authenticity Scan

Provider:

Hive AI – Forensics + Image Moderation + Synthetic Media Detection

Backend Logic:

User uploads → Supabase temporary storage

Backend forwards to Hive AI

Hive returns authenticity % + metadata

Store result in scan_history

Optionally notify user with Firebase Push

3. Login / Authentication

Provider:

Google OAuth (Mobile)

Backend Logic:

Mobile app uses Google Sign-In

Sends token to backend

Backend verifies with Google API

Creates or returns user

Issues your own JWT session token

No passwords stored.
No manual auth complexity.

4. Payments / Subscription

Providers:

Stripe (international)

Paystack (Africa-friendly)

Backend Logic:

Stripe for subscription + usage billing

Paystack for regional payments

Webhooks inform backend about successful payments

Backend updates user’s plan + credits

5. Storage (Images, Designs, Scans)

Provider:

Supabase Storage

Backend Logic:

Temporary uploads: /uploads/tmp/...

Final designs: /designs/users/{id}/...

Authenticated access policies

CDN delivery for mobile app

6. Analytics

Provider:

Firebase Analytics

Usage:

Track daily scans

Poster generation attempts

Session length

Feature usage breakdown

A/B experiments

7. Background Removal / Upscaling

Provider:

remove.bg API

Backend Logic:

User uploads design asset or photo

Backend sends to remove.bg

Returns cleaned/transformed image

Store in Supabase

User edits it in Poster Editor


