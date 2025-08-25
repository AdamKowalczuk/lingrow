'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { useTargetLanguage } from '@/store/use-target-language';

export const Header = () => {
  const locale = useLocale();
  const { targetLanguage } = useTargetLanguage();
  const t = useTranslations('languages');

  const getTitleByTargetLanguage = () => {
    switch (targetLanguage) {
      case 'pl':
        return t('polish');
      case 'en':
        return t('english');
      case 'jp':
        return t('japanese');
      default:
        return t('polish');
    }
  };

  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 border-gray-200 mb-5 text-gray-700 lg:z-50">
      <Link href={`/${locale}/courses`}>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 stroke-2" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg text-gray-800">
        {getTitleByTargetLanguage()}
      </h1>
      <div />
    </div>
  );
};
