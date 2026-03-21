<div align="center">

  <h1>🧘‍♂️ Jogire | Holistic Health & Wellness (Frontend)</h1>
  
  <p>
    <strong>From Compulsive Bhogi to Conscious Bhogi.</strong><br>
    The official frontend client for the Jogire platform, bridging ancient yogic wisdom with modern clinical science.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Cal.com-000000?style=for-the-badge&logo=cal.com&logoColor=white" alt="Cal.com" />
  </p>
  
  <p>
    <a href="#-features">Features</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Structure</a>
  </p>

</div>

---

## ✨ Features

- **🎨 Immersive Editorial UI:** A bespoke, magazine-style interface built with Next.js App Router, featuring smooth scroll reveals, tactile mobile interactions, and a fully responsive grid system.
- **📅 Frictionless Booking:** Deep headless integration with [Cal.com](https://cal.com/) for a 7-day rolling consultation window, eliminating no-shows and driving conversions seamlessly on-site.
- **⚡ SEO Optimized:** Dynamic metadata generation and server-side rendering (SSR) ensure high visibility for individual guru profiles and program pages.
- **📱 Mobile-First Interactions:** Advanced `active:scale` and tactile feedback mechanics engineered specifically to mimic native iOS application feel on mobile devices.

---

## 🏗️ Architecture

This repository contains the decoupled **Client Frontend**. It is designed to consume data from and send payloads to our separate FastAPI backend microservice.

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Studio Theme: `#d67952`)
- **Booking Engine:** `@calcom/embed-react`
- **Deployment:** Vercel (Recommended)

---

## 🚀 Getting Started

Follow these instructions to set up the frontend locally for development and testing.

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

```bash
git clone [https://github.com/yourusername/jogire-frontend.git](https://github.com/yourusername/jogire-frontend.git)
cd jogire-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory. You will need to link your backend API URL once the FastAPI service is spun up.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

4. **Start the development server:**

```bash
npm run dev
```

_The application will now be running on `http://localhost:3000`._

---

## 📁 Project Structure

```text
jogire-frontend/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── book/             # Cal.com Booking Interface
│   ├── contact/          # Split-Pane Contact Form
│   ├── gurus/            # Dynamic Lineage & Inspiration Profiles
│   ├── mission/          # Brand Philosophy & Storytelling
│   ├── layout.tsx        # Global Layout (Nav, Footer, WhatsApp Widget)
│   └── page.tsx          # Main Landing Page
├── components/           # Reusable UI Components
│   ├── FAQ.tsx           # Accessible Accordion
│   ├── Navbar.tsx        # Mobile-Responsive Drawer Nav
│   ├── WhatsAppWidget.tsx# Floating Global Contact Widget
│   └── ...
├── lib/                  # Structured Data & Utilities
│   └── gurusData.ts      # Content schemas for easy iteration
└── public/               # Static Assets & SVGs
```

---

<div align="center">
  <p>Designed with mindfulness. Built for scale.</p>
  <p><strong>&copy; 2026 Jogire Holistic Health & Wellness</strong></p>
</div>
