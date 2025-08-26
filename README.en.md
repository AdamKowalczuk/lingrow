# 🎯 Lingrow - Language Learning Platform

[![Polski](https://img.shields.io/badge/Polski-README.md-green)](README.md)

**Lingrow** is a modern web application for learning foreign languages, built with the latest web technologies. The application offers interactive lessons, progress tracking, quests, and an attractive user interface with full multilingual support.

## ✨ Features

### 🎓 Learning System

- **Interactive lessons** - Learning through multiple choice questions (SELECT) and assisted questions (ASSIST)
- **Course structure** - Organization in courses → units → lessons → challenges
- **Progress tracking** - Monitoring completed lessons and challenges
- **Hearts system** - Gaming mechanics with limited lives

### 🎮 Gamification Elements

- **Points system** - Earning XP for completed challenges
- **Quests** - Daily challenges with heart rewards
- **Leaderboard** - Comparing results with other users
- **Shop** - Spending points to refill hearts

### 💰 Payment System

- **Pro subscription** - Unlimited hearts and additional features
- **Stripe integration** - Secure online payments
- **Webhooks** - Automatic subscription management

### 🌍 Multilingual Support

- **3 languages supported** - Polish (default), English, Japanese
- **Interface localization** - Full translation of all elements
- **Multilingual content** - Courses available in different languages

### 🎨 Interface and UX

- **Modern design** - Interface with Tailwind CSS v4
- **Responsive design** - Works on all devices
- **Audio and multimedia** - Support for audio files and images

### 🔧 Admin Panel

- **React Admin** - Complete content management panel
- **CRUD operations** - Creating, editing and deleting courses, units, lessons and challenges
- **Options management** - Editing answers and challenge options

## 🛠️ Technologies

### Frontend

- **Next.js 15.4.6** - React framework with App Router and Turbopack
- **React 19.1.0** - Latest React version
- **TypeScript 5** - Static typing
- **Tailwind CSS v4** - CSS framework with custom colors
- **Lucide React** - Icons
- **next-intl** - Internationalization and multilingual support

### Backend & Database

- **Drizzle ORM 0.44.4** - Type-safe ORM
- **PostgreSQL** - Database (Neon)
- **Next.js API Routes** - Backend API
- **Drizzle Kit** - Migrations and database management

### Authentication & Payments

- **Clerk 6.30.0** - User authentication system
- **Stripe 18.4.0** - Payment and subscription handling
- **Stripe Webhooks** - Automatic subscription management

### Admin Panel

- **React Admin 5.10.1** - Complete admin panel
- **ra-data-simple-rest** - Data provider for React Admin
- **Radix UI** - UI components (Dialog, Select, Progress, Avatar)

### State Management

- **Zustand 5.0.7** - Application state management
- **React Use** - Useful React hooks

### Development Tools

- **Prettier 3.6.2** - Code formatting
- **ESLint 9** - Code linting
- **TSX** - Running TypeScript in Node.js
- **Turbopack** - Fast Next.js bundler

## 🚀 Installation and Setup

### Requirements

- **Node.js 18+** - Required to run the application
- **npm** - Package manager
- **Neon account** - Cloud PostgreSQL
- **Clerk account** - Authentication system
- **Stripe account** - Payment processing

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/AdamKowalczuk/lingrow.git
cd lingrow
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Fill the `.env.local` file:

```env
# Clerk - User authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database - Neon PostgreSQL
DATABASE_URL=postgresql://user:password@host:port/database

# Stripe - Payments and subscriptions
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. **Run the database**

```bash
npm run db:push
```

5. **Seed the database (optional)**

```bash
npm run db:seed
```

6. **Run the application**

```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

### Database migrations and management

```bash
npm run db:push      # Synchronize schema with database
npm run db:studio    # Open Drizzle Studio (database GUI)
npm run db:seed      # Fill database with test data
npm run db:reset     # Reset database
```

## 🔧 npm Scripts

### Basic

```bash
npm run dev          # Run in development mode (with Turbopack)
npm run build        # Production build
npm run start        # Run production version
```

### Code Quality

```bash
npm run lint         # Check code with ESLint
npm run format       # Format code with Prettier
```

### Database

```bash
npm run db:push      # Synchronize database
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Fill database with test data
npm run db:reset     # Reset database
```

## 🌍 Multilingual Support

The application supports 3 languages:

- **Polish (pl)** - default language
- **English (en)** - English
- **Japanese (jp)** - 日本語

Translation files are located in the `messages/` directory:

- `messages/pl.json` - Polish translations
- `messages/en.json` - English translations
- `messages/jp.json` - Japanese translations

## 🔧 Admin Panel

The application includes a complete admin panel available at `/admin`:

- **Course management** - Creating and editing language courses
- **Unit management** - Organizing content into units
- **Lesson management** - Creating lessons within units
- **Challenge management** - Adding questions and tasks
- **Options management** - Editing answers and choice options

The panel uses React Admin with automatic CRUD form generation.

## 📸 Screenshots

### 🎓 Homepage and learning

![Homepage](screenshots/homepage.png)
![Learn page](screenshots/learn-page.png)
![Lesson page](screenshots/lesson-page.png)

### 🎮 Gamification elements

![Leaderboard](screenshots/leaderboard-page.png)
![Quests](screenshots/quests-page.png)
![Shop](screenshots/shop-page.png)

### 🔧 Admin panel

![Admin panel](screenshots/admin-panel.png)

## 📝 License

This project is available under the MIT license. See the `LICENSE` file for details.

## 📞 Contact

- **Author**: Adam Kowalczuk
- **Email**: adamkowalczuk99@gmail.com
- **GitHub**: [@AdamKowalczuk](https://github.com/AdamKowalczuk)

## 🙏 Acknowledgments

---

⭐ **If you like this project, give it a star on GitHub!**
