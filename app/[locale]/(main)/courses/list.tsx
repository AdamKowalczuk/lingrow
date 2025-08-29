'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { upsertUserProgress } from '@/actions/user-progress';
import { courses } from '@/db/schema';
import { useLocale } from '@/hooks/use-locale';
import { useTargetLanguage } from '@/store/use-target-language';

import Card from './card';

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId: number | null;
};

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { targetLanguage, setTargetLanguage } = useTargetLanguage();

  const onClick = (course: (typeof courses)[0]) => {
    if (pending) return;

    setTargetLanguage(course.targetLanguage as 'pl' | 'en' | 'jp');

    if (targetLanguage && activeCourseId) {
      return router.push(`/${locale}/learn`);
    }

    startTransition(async () => {
      try {
        await upsertUserProgress(1, locale);
        router.push(`/${locale}/learn`);
      } catch {
        toast.error(tCommon('somethingWentWrong'));
      }
    });
  };

  const getTitleByLocale = (course: (typeof courses)[0]) => {
    switch (locale) {
      case 'pl':
        return course.titlePl;
      case 'en':
        return course.titleEn;
      case 'jp':
        return course.titleJp;
      default:
        return course.titleEn;
    }
  };

  return (
    <div className="pt-3 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 sm:gap-6">
      {courses.map(course => (
        <Card
          key={course.id}
          id={course.id}
          title={getTitleByLocale(course)}
          imageSrc={course.imageSrc}
          onClick={() => onClick(course)}
          disabled={pending}
          active={targetLanguage === course.targetLanguage}
        />
      ))}
    </div>
  );
};

export default List;
