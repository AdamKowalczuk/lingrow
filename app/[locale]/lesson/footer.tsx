import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useKey, useMedia } from 'react-use';

import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { cn } from '@/lib/utils';

type Props = {
  disabled?: boolean;
  status: 'none' | 'correct' | 'wrong' | 'completed';
  onCheck: () => void;
  lessonId?: number;
};

const Footer = ({ disabled, status, onCheck, lessonId }: Props) => {
  useKey('Enter', onCheck, {}, [onCheck]);
  const isMobile = useMedia('(max-width: 1024px)');
  const locale = useLocale();
  const t = useTranslations('lesson.footer');
  return (
    <footer
      className={cn(
        'lg:-h[140px] h-[100px] border-t-2',
        status === 'correct' && 'border-transparent bg-indigo-100',
        status === 'wrong' && 'border-transparent bg-rose-100',
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === 'correct' && (
          <div className="text-indigo-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            {t('nicelyDone')}
          </div>
        )}
        {status === 'wrong' && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            {t('tryAgain')}
          </div>
        )}
        {status === 'completed' && (
          <Button
            variant="default"
            size={isMobile ? 'sm' : 'lg'}
            onClick={() => {
              window.location.href = `/${locale}/lesson/${lessonId}`;
            }}
          >
            {t('practiceAgain')}
          </Button>
        )}
        <Button
          variant={status === 'wrong' ? 'danger' : 'secondary'}
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? 'sm' : 'lg'}
        >
          {status === 'none' && t('check')}
          {status === 'correct' && t('next')}
          {status === 'wrong' && t('retry')}
          {status === 'completed' && t('continue')}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
