'use client';

import {
  ClerkLoading,
  ClerkLoaded,
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale } from '@/hooks/use-locale';

const Header = () => {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-2 sm:px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-2 sm:pl-4 pb-7 flex items-center gap-x-2 sm:gap-x-3">
          <Image
            src="/logo.png"
            alt="logo"
            width={32}
            height={32}
            className="sm:w-10 sm:h-10"
          />
          <h1 className="text-lg sm:text-2xl font-extrabold text-indigo-500 tracking-wide">
            Lingrow
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Select
            value={locale}
            onValueChange={value => {
              const newPath = pathname.replace(/^\/[a-z]{2}/, `/${value}`);
              router.push(newPath);
            }}
          >
            <SelectTrigger className="w-18 sm:w-24 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pl">🇵🇱</SelectItem>
              <SelectItem value="en">🇬🇧</SelectItem>
              <SelectItem value="jp">🇯🇵</SelectItem>
            </SelectContent>
          </Select>

          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex gap-1 sm:gap-2">
                <SignInButton
                  mode="modal"
                  fallbackRedirectUrl={`/${locale}/learn`}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs sm:text-sm px-2 sm:px-4"
                  >
                    {t('login')}
                  </Button>
                </SignInButton>
                <SignUpButton
                  mode="modal"
                  fallbackRedirectUrl={`/${locale}/learn`}
                >
                  <Button
                    size="sm"
                    variant="primary"
                    className="text-xs sm:text-sm px-2 sm:px-4"
                  >
                    {t('signUp')}
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
