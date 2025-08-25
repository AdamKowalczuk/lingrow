'use client';

import { InfinityIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useLocale } from '@/hooks/use-locale';
import { useTargetLanguage } from '@/store/use-target-language';

import { Button } from './ui/button';

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  const locale = useLocale();
  const t = useTranslations('userProgress');
  const tLanguages = useTranslations('languages');
  const { targetLanguage } = useTargetLanguage();

  const getImageSrcByTargetLanguage = () => {
    switch (targetLanguage) {
      case 'pl':
        return '/pl.svg';
      case 'en':
        return '/en.svg';
      case 'jp':
        return '/jp.svg';
      default:
        return '/pl.svg';
    }
  };

  const getTitleByTargetLanguage = () => {
    switch (targetLanguage) {
      case 'pl':
        return tLanguages('polish');
      case 'en':
        return tLanguages('english');
      case 'jp':
        return tLanguages('japanese');
      default:
        return tLanguages('polish');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between gap-x-4 w-full">
        <Link href={`/${locale}/courses`}>
          <Button
            variant="ghost"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Image
              src={getImageSrcByTargetLanguage()}
              alt={getTitleByTargetLanguage()}
              className="rounded-lg border-2 border-gray-200"
              width={32}
              height={32}
            />
          </Button>
        </Link>

        <Link href={`/${locale}/shop`}>
          <Button
            variant="ghost"
            className="text-orange-600 hover:bg-orange-50 rounded-xl px-3 py-2 transition-colors"
          >
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2">
              <Image
                src="/points.svg"
                alt={t('points')}
                width={20}
                height={20}
                className="text-orange-600"
              />
            </div>
            <span className="font-semibold">{points}</span>
          </Button>
        </Link>

        <Link href={`/${locale}/shop`}>
          <Button
            variant="ghost"
            className="text-rose-600 hover:bg-rose-50 rounded-xl px-3 py-2 transition-colors"
          >
            <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center mr-2">
              {hasActiveSubscription ? (
                <InfinityIcon className="h-5 w-5 stroke-[2.5] text-rose-600" />
              ) : (
                <Image
                  src="/heart.svg"
                  alt={t('hearts')}
                  width={20}
                  height={20}
                  className="text-rose-600"
                />
              )}
            </div>
            <span className="font-semibold">
              {hasActiveSubscription ? '∞' : hearts}
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
