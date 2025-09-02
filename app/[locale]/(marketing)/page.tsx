import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  ClerkLoaded,
  ClerkLoading,
} from '@clerk/nextjs';
import { Loader, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('marketing');
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="flex flex-col items-center gap-y-8">
        <div className="relative mb-3 lg:mb-4">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
          </div>
          <div className="absolute inset-0 w-14 h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-2xl lg:rounded-3xl mx-auto opacity-20 blur-xl"></div>
        </div>

        <h1 className="text-xl lg:text-3xl font-bold text-gray-800 max-w-[480px] text-center">
          {t('title')}
        </h1>

        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                fallbackRedirectUrl={`/${locale}/learn`}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  data-testid="sign-up-button"
                >
                  {t('getStarted')}
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                fallbackRedirectUrl={`/${locale}/learn`}
              >
                <Button
                  size="lg"
                  variant="primaryOutline"
                  className="w-full"
                  data-testid="sign-in-button"
                >
                  {t('alreadyHaveAccount')}
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href={`/${locale}/learn`}>{t('button')}</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/donkey/superhero.png" alt="Hero" fill className="block" />
      </div>
    </div>
  );
}
