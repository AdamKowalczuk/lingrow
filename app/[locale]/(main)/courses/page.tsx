import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { getCourses, getUserProgress } from '@/db/queries';
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
  const userProgress = await getUserProgress();

  setRequestLocale(locale);

  const t = await getTranslations('coursesPage');
  const coursesData = await getCourses(locale);

  const courses = await coursesData;

  return (
    <div className="h-full px-6 mx-auto">
      <div className="relative mb-8 overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-indigo-400/5 to-transparent rounded-3xl"></div>

        <div className="relative text-center py-6 lg:py-8 px-4 lg:px-6">
          <div className="relative mx-auto mb-3 lg:mb-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto shadow-lg">
              <svg
                className="h-6 w-6 lg:h-8 lg:w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div className="absolute inset-0 w-14 h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-2xl lg:rounded-3xl mx-auto opacity-20 blur-xl"></div>
          </div>

          <h1 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3 text-gray-800">
            {t('title')}
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mx-auto leading-relaxed">
            {t('description')}
          </p>

          <div className="absolute top-2 right-2 lg:top-3 lg:right-3 w-10 h-10 lg:w-12 lg:h-12 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-2 left-2 lg:bottom-3 lg:left-3 w-6 h-6 lg:w-8 lg:h-8 bg-indigo-500/10 rounded-full blur-xl"></div>
        </div>
      </div>

      <List
        courses={courses}
        activeCourseId={userProgress?.activeCourseId ?? null}
      />
    </div>
  );
};

export default CoursesPage;
