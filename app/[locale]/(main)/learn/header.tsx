'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { useTargetLanguage } from '@/store/use-target-language';

export const Header = () => {
  const locale = useLocale();
  const { targetLanguage } = useTargetLanguage();

  const getTitleByTargetLanguage = () => {
    switch (targetLanguage) {
      case 'pl':
        return locale === 'pl'
          ? 'Polski'
          : locale === 'en'
            ? 'Polish'
            : 'ポーランド語';
      case 'en':
        return locale === 'pl'
          ? 'Angielski'
          : locale === 'en'
            ? 'English'
            : '英語';
      case 'jp':
        return locale === 'pl'
          ? 'Japoński'
          : locale === 'en'
            ? 'Japanese'
            : '日本語';
      default:
        return locale === 'pl'
          ? 'Polski'
          : locale === 'en'
            ? 'Polish'
            : 'ポーランド語';
    }
  };

  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href={`/${locale}/courses`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg">{getTitleByTargetLanguage()}</h1>
      <div />
    </div>
  );
};
