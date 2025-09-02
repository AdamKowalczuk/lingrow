import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';
import { routing } from '@/i18n/routing';

import Quiz from '../quiz';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lessonId: number }>;
}): Promise<Metadata> {
  const { locale, lessonId } = await params;
  setRequestLocale(locale);

  const lesson = await getLesson(lessonId, locale);

  if (!lesson) {
    return {
      title: 'Lekcja nie znaleziona',
      description: 'Nie można znaleźć lekcji o podanym ID.',
    };
  }

  return {
    title: `Lekcja ${lesson.title}`,
    description: `Rozpocznij lekcję: ${lesson.title}. Interaktywne ćwiczenia i nauka języka.`,
    keywords: [
      'lekcja językowa',
      'ćwiczenia interaktywne',
      'nauka języka',
      lesson.title,
      'platforma edukacyjna',
    ],
  };
}

type Props = {
  params: Promise<{
    lessonId: number;
    locale: string;
  }>;
};

const LessonIdPage = async ({ params }: Props) => {
  const { lessonId, locale } = await params;

  setRequestLocale(locale);

  const lessonData = await getLesson(lessonId, locale);
  const userProgressData = await getUserProgress(locale);
  const userSubscriptionData = await getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect(`/${locale}/learn`);
  }

  const initialPercentage =
    (lesson.challenges.filter(
      (challenge: { completed: boolean }) => challenge.completed,
    ).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonIdPage;
