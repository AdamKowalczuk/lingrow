import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  ClerkLoaded,
  ClerkLoading,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
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
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
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
                <Button size="lg" variant="secondary" className="w-full">
                  {t('getStarted')}
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                fallbackRedirectUrl={`/${locale}/learn`}
              >
                <Button size="lg" variant="primaryOutline" className="w-full">
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
        <Image src="/donkey/superhero.png" alt="Hero " fill />
      </div>
    </div>
  );
}
