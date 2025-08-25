'use client';

import { InfinityIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Progress } from '@/components/ui/progress';
import { useExitModal } from '@/store/use-exit-modal';

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

const Header = ({ hearts, percentage, hasActiveSubscription }: Props) => {
  const { open } = useExitModal();
  const t = useTranslations('images');
  return (
    <header className="lg:pt-[50px] pt-[20px] px-6 lg:px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <button
        onClick={open}
        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>
      <Progress
        value={percentage}
        className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"
      />
      <div className="flex items-center font-bold bg-rose-50 px-3 py-2 rounded-lg">
        <Image
          src="/heart.svg"
          height={24}
          width={24}
          alt={t('hearts')}
          className="mr-2 flex-shrink-0"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-5 w-5 stroke-[2.5] flex-shrink-0" />
        ) : (
          <span className="text-rose-600 flex-shrink-0">{hearts}</span>
        )}
      </div>
    </header>
  );
};

export default Header;
