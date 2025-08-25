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
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href={`/${locale}/courses`}>
        <Button variant="ghost">
          <Image
            src={getImageSrcByTargetLanguage()}
            alt={getTitleByTargetLanguage()}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href={`/${locale}/shop`}>
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            alt={t('points')}
            className="mr-2"
            width={28}
            height={28}
          />
          {points}
        </Button>
      </Link>
      <Link href={`/${locale}/shop`}>
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            alt={t('hearts')}
            className="mr-2"
            width={22}
            height={22}
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
