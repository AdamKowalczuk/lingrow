import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  variant: 'points' | 'hearts';
  value: number;
};

const ResultCard = ({ variant, value }: Props) => {
  const imageSrc = variant === 'hearts' ? '/heart.svg' : '/points.svg';
  const t = useTranslations('lesson.resultCard');
  const tImages = useTranslations('images');
  return (
    <div
      className={cn(
        'rounded-2xl border-2 w-full md:min-w-[200px] h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-200',
        variant === 'points' &&
          'bg-gradient-to-br from-orange-400 to-orange-500 border-orange-400',
        variant === 'hearts' &&
          'bg-gradient-to-br from-rose-500 to-rose-600 border-rose-500',
      )}
    >
      <div
        className={cn(
          'p-2 text-white rounded-t-xl font-bold text-center uppercase text-xs tracking-wide',
          variant === 'points' && 'bg-orange-500/20 backdrop-blur-sm',
          variant === 'hearts' && 'bg-rose-500/20 backdrop-blur-sm',
        )}
      >
        {variant === 'hearts' ? t('heartsLeft') : t('totalXp')}
      </div>
      <div
        className={cn(
          'rounded-2xl bg-white/95 backdrop-blur-sm items-center flex justify-center p-6 font-bold text-2xl shadow-inner',
          variant === 'points' && 'text-orange-500',
          variant === 'hearts' && 'text-rose-500',
        )}
      >
        <Image
          src={imageSrc}
          alt={tImages('icon')}
          width={32}
          height={32}
          className="mr-2"
        />
        {value}
      </div>
    </div>
  );
};

export default ResultCard;
