import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { getCourses } from '@/db/queries';
import { routing } from '@/i18n/routing';

import List from './list';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

const CoursesPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('coursesPage');
  const coursesData = await getCourses(locale);

  const courses = await coursesData;

  return (
    <div className="h-full px-6 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">{t('title')}</h1>
      <List courses={courses} />
    </div>
  );
};

export default CoursesPage;
