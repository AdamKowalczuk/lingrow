import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { FeedWrapper } from '@/components/feed-wrapper';
import Promo from '@/components/promo';
import Quests from '@/components/quests';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
  getQuestProgress,
} from '@/db/queries';
import { routing } from '@/i18n/routing';

import { Header } from './header';
import Unit from './unit';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('sidebar');

  return {
    title: t('learn'),
    description:
      'Rozpocznij swoją podróż językową z interaktywnymi lekcjami i ćwiczeniami.',
    keywords: [
      'nauka języków',
      'lekcje interaktywne',
      'ćwiczenia językowe',
      'postęp w nauce',
      'jednostki lekcyjne',
    ],
  };
}

const LearnPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  setRequestLocale(locale);
  const userProgressData = getUserProgress(locale);
  const courseProgressData = getCourseProgress(locale);
  const lessonPercentageData = getLessonPercentage(locale);
  const unitsData = getUnits(locale);
  const questProgressData = getQuestProgress();

  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    courseProgress,
    units,
    lessonPercentage,
    userSubscription,
    questProgress,
  ] = await Promise.all([
    userProgressData,
    courseProgressData,
    unitsData,
    lessonPercentageData,
    userSubscriptionData,
    questProgressData,
  ]);

  if (!userProgress) {
    redirect(`/${locale}/courses`);
  }

  if (!courseProgress) {
    redirect(`/${locale}/courses`);
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} questProgress={questProgress} />
      </StickyWrapper>
      <FeedWrapper>
        <Header />
        {units.map(unit => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
