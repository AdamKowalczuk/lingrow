# 🎯 Lingrow - Platforma do Nauki Języków

[![English](https://img.shields.io/badge/English-README.en.md-blue)](README.en.md)

**Lingrow** to nowoczesna aplikacja webowa do nauki języków obcych, zbudowana z wykorzystaniem najnowszych technologii webowych. Aplikacja oferuje interaktywne lekcje, system postępów, zadania (questy) oraz atrakcyjny interfejs użytkownika z pełnym wsparciem wielojęzycznym.

## ✨ Funkcjonalności

### 🎓 System Nauki

- **Interaktywne lekcje** - Nauka poprzez pytania wielokrotnego wyboru (SELECT) i pytania z asystą (ASSIST)
- **Struktura kursów** - Organizacja w kursy → jednostki → lekcje → wyzwania
- **Śledzenie postępów** - Monitorowanie ukończonych lekcji i wyzwań
- **System serc** - Mechanika gier z ograniczoną liczbą żyć

### 🎮 Elementy Grywalizacji

- **System punktów** - Zdobywanie XP za ukończone wyzwania
- **Zadania (Questy)** - Codzienne wyzwania z nagrodami w postaci serc
- **Ranking** - Porównywanie wyników z innymi użytkownikami
- **Sklep** - Wydawanie punktów na uzupełnienie serc

### 💰 System Płatności

- **Subskrypcja Pro** - Nieograniczone serca i dodatkowe funkcje
- **Integracja Stripe** - Bezpieczne płatności online
- **Webhooki** - Automatyczne zarządzanie subskrypcjami

### 🌍 Wielojęzyczność

- **Wsparcie 3 języków** - Polski (domyślny), Angielski, Japoński
- **Lokalizacja interfejsu** - Pełne tłumaczenie wszystkich elementów
- **Treści wielojęzyczne** - Kursy dostępne w różnych językach

### 🎨 Interfejs i UX

- **Nowoczesny design** - Interfejs z Tailwind CSS v4
- **Responsywny design** - Działanie na wszystkich urządzeniach
- **Dźwięki i multimedia** - Wsparcie dla plików audio i obrazów

### 🔧 Panel Administracyjny

- **React Admin** - Kompletny panel do zarządzania treścią
- **CRUD operacje** - Tworzenie, edycja i usuwanie kursów, jednostek, lekcji i wyzwań
- **Zarządzanie opcjami** - Edycja odpowiedzi i opcji wyzwań

## 🛠️ Technologie

### Frontend

- **Next.js 15.4.6** - Framework React z App Router i Turbopack
- **React 19.1.0** - Najnowsza wersja React
- **TypeScript 5** - Typowanie statyczne
- **Tailwind CSS v4** - Framework CSS z custom colors
- **Lucide React** - Ikony
- **next-intl** - Internacjonalizacja i wielojęzyczność

### Backend & Baza Danych

- **Drizzle ORM 0.44.4** - Type-safe ORM
- **PostgreSQL** - Baza danych (Neon)
- **Next.js API Routes** - Backend API
- **Drizzle Kit** - Migracje i zarządzanie bazą danych

- 

### Autoryzacja & Płatności

- **Clerk 6.30.0** - System autoryzacji użytkowników
- **Stripe 18.4.0** - Obsługa płatności i subskrypcji
- **Webhooki Stripe** - Automatyczne zarządzanie subskrypcjami

### Panel Administracyjny

- **React Admin 5.10.1** - Kompletny panel administracyjny
- **ra-data-simple-rest** - Provider danych dla React Admin
- **Radix UI** - Komponenty UI (Dialog, Select, Progress, Avatar)

### Stan i Zarządzanie

- **Zustand 5.0.7** - Zarządzanie stanem aplikacji
- **React Use** - Przydatne hooki React

### Narzędzia deweloperskie

- **Prettier 3.6.2** - Formatowanie kodu
- **ESLint 9** - Linting kodu
- **Turbopack** - Szybki bundler Next.js

## 🚀 Instalacja i uruchomienie

### Wymagania

- **Node.js 18+** - Wymagane do uruchomienia aplikacji
- **npm** - Menedżer pakietów
- **Konto Neon** - PostgreSQL w chmurze
- **Konto Clerk** - System autoryzacji
- **Konto Stripe** - Obsługa płatności

-

### Kroki instalacji

1. **Klonowanie repozytorium**

```bash
git clone https://github.com/AdamKowalczuk/lingrow.git
cd lingrow
```

2. **Instalacja zależności**

```bash
npm install
```

3. **Konfiguracja zmiennych środowiskowych**

```bash
cp .env.example .env.local
```

Wypełnij plik `.env.local`:

```env
# Clerk - Autoryzacja użytkowników
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database - Neon PostgreSQL
DATABASE_URL=postgresql://user:password@host:port/database

# Stripe - Płatności i subskrypcje
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. **Uruchomienie bazy danych**

```bash
npm run db:push
```

5. **Seedowanie bazy danych (opcjonalne)**

```bash
npm run db:seed
```

6. **Uruchomienie aplikacji**

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

### Migracje i zarządzanie bazą danych

```bash
npm run db:push      # Synchronizuj schemat z bazą danych
npm run db:studio    # Otwórz Drizzle Studio (GUI do bazy)
npm run db:seed      # Wypełnij bazę danymi testowymi
npm run db:reset     # Zresetuj bazę danych
```

## 🔧 Skrypty npm

### Podstawowe

```bash
npm run dev          # Uruchom w trybie deweloperskim (z Turbopack)
npm run build        # Build produkcyjny
npm run start        # Uruchom wersję produkcyjną
```

### Jakość kodu

```bash
npm run lint         # Sprawdź kod ESLint
npm run format       # Formatuj kod Prettier
```

### Baza danych

```bash
npm run db:push      # Synchronizuj bazę danych
npm run db:studio    # Otwórz Drizzle Studio
npm run db:seed      # Wypełnij bazę danymi testowymi
npm run db:reset     # Zresetuj bazę danych
```

## 🌍 Wielojęzyczność

Aplikacja obsługuje 3 języki:

- **Polski (pl)** - język domyślny
- **Angielski (en)** - English
- **Japoński (jp)** - 日本語

## 🔧 Panel Administracyjny

Aplikacja zawiera kompletny panel administracyjny dostępny pod adresem `/admin`:

- **Zarządzanie kursami** - Tworzenie i edycja kursów językowych
- **Zarządzanie jednostkami** - Organizacja treści w jednostki
- **Zarządzanie lekcjami** - Tworzenie lekcji w ramach jednostek
- **Zarządzanie wyzwaniami** - Dodawanie pytań i zadań
- **Zarządzanie opcjami** - Edycja odpowiedzi i opcji wyboru

Panel wykorzystuje React Admin z automatycznym generowaniem formularzy CRUD.

## 📸 Screenshots

### 🎓 Strona główna i nauka

![Strona główna](screenshots/homepage.png)
![Strona nauki](screenshots/learn-page.png)
![Lekcja](screenshots/lesson-page.png)

### 🎮 Elementy grywalizacji

![Ranking](screenshots/leaderboard-page.png)
![Zadania](screenshots/quests-page.png)
![Sklep](screenshots/shop-page.png)

### 🔧 Panel administracyjny

![Panel admin](screenshots/admin-panel.png)

## 📝 Licencja

Ten projekt jest dostępny na licencji MIT. Zobacz plik `LICENSE` dla szczegółów.

## 📞 Kontakt

- **Autor**: Adam Kowalczuk
- **Email**: adamkowalczuk99@gmail.com
- **GitHub**: [@AdamKowalczuk](https://github.com/AdamKowalczuk)

## 🙏 Podziękowania

---

⭐ **Jeśli projekt Ci się podoba, daj gwiazdkę na GitHub!**
