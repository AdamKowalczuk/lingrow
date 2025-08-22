import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';
import { routing } from '@/i18n/routing';

import Quiz from './quiz';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

const LessonPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const lessonData = await getLesson();
  const userProgressData = await getUserProgress();
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

export default LessonPage;
