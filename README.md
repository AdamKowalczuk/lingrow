# 🎯 Lingrow - Platforma do Nauki Języków

**Lingrow** to nowoczesna aplikacja webowa do nauki języków obcych, zbudowana z wykorzystaniem najnowszych technologii webowych. Aplikacja oferuje interaktywne lekcje, system postępów oraz atrakcyjny interfejs użytkownika.

## ✨ Funkcjonalności

- 🎓 **Interaktywne lekcje** - Nauka poprzez pytania wielokrotnego wyboru
- 🎨 **Atrakcyjny design** - Nowoczesny interfejs z Tailwind CSS
- 🔐 **Autoryzacja użytkowników** - Bezpieczne logowanie przez Clerk
- 📊 **Śledzenie postępów** - Monitorowanie ukończonych lekcji
- 🎵 **Dźwięki i multimedia** - Wsparcie dla plików audio i obrazów
- 📱 **Responsywny design** - Działanie na wszystkich urządzeniach
- 🗄️ **Baza danych** - Przechowywanie danych użytkowników i postępów

## 🛠️ Technologie

### Frontend

- **Next.js 14** - Framework React z App Router
- **TypeScript** - Typowanie statyczne
- **Tailwind CSS v4** - Framework CSS z custom colors
- **Lucide React** - Ikony

### Backend & Baza Danych

- **Drizzle ORM** - Type-safe ORM
- **PostgreSQL** - Baza danych (Neon)
- **Next.js API Routes** - Backend API

### Autoryzacja & Płatności

- **Clerk** - System autoryzacji użytkowników
- **Stripe** - Obsługa płatności i subskrypcji

### Narzędzia deweloperskie

- **Prettier** - Formatowanie kodu
- **ESLint** - Linting kodu
- **Drizzle Kit** - Migracje bazy danych

## 🚀 Instalacja i uruchomienie

### Wymagania

- Node.js 18+
- npm lub yarn
- Konto Neon (PostgreSQL)
- Konto Clerk
- Konto Stripe

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
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Neon)
DATABASE_URL=postgresql://user:password@host:port/database

# Stripe
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

### Migracje

```bash
npm run db:push      # Push schematu do bazy
npm run db:studio    # Otwórz Drizzle Studio
```

## 🔧 Skrypty npm

```bash
npm run dev          # Uruchom w trybie deweloperskim
npm run build        # Build produkcyjny
npm run start        # Uruchom produkcyjnie
npm run lint         # Sprawdź kod ESLint
npm run format       # Formatuj kod Prettier
npm run db:push      # Synchronizuj bazę danych
npm run db:seed      # Wypełnij bazę danymi testowymi
```

## 📝 Licencja

Ten projekt jest dostępny na licencji MIT. Zobacz plik `LICENSE` dla szczegółów.

## 📞 Kontakt

- **Autor**: Adam Kowalczuk
- **Email**: adamkowalczuk99@gmail.com
- **GitHub**: [@AdamKowalczuk](https://github.com/AdamKowalczuk)

## 🙏 Podziękowania

---

⭐ **Jeśli projekt Ci się podoba, daj gwiazdkę na GitHub!**
