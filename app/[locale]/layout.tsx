import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import './globals.css';

import ExitModal from '@/components/modals/exit-modal';
import HeartsModal from '@/components/modals/hearts-modal';
import PracticeModal from '@/components/modals/practice-modal';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';

const font = Nunito({
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('common');

  return {
    title: {
      template: `%s | ${t('appName')}`,
      default: t('appTitle'),
    },
    description: t('appDescription'),
    keywords: [
      'nauka języków',
      'lingrow',
      'język angielski',
      'język japoński',
      'język polski',
      'interaktywne lekcje',
      'platforma edukacyjna',
      'gry językowe',
      'ćwiczenia językowe',
    ],
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body
          className={`${font.className} antialiased`}
          suppressHydrationWarning
        >
          <NextIntlClientProvider>
            <Toaster />
            <ExitModal />
            <HeartsModal />
            <PracticeModal />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
