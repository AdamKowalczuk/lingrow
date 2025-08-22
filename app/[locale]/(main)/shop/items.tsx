'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { refillHearts } from '@/actions/user-progress';
import { createStripeUrl } from '@/actions/user-subscription';
import { Button } from '@/components/ui/button';
import { POINTS_TO_REFILL } from '@/constants';

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();
  const t = useTranslations('shopItems');
  const tCommon = useTranslations('common');

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

    startTransition(async () => {
      refillHearts().catch(() => toast.error(tCommon('somethingWentWrong')));
    });
  };

  const onUpgrade = () => {
    startTransition(async () => {
      createStripeUrl()
        .then(res => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error(tCommon('somethingWentWrong')));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt={t('heart')} width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl">
            {t('refillHearts')}
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            t('full')
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="points" width={20} height={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src="/unlimited.svg"
          alt={t('unlimited')}
          width={60}
          height={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl">
            {t('unlimitedHearts')}
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? t('settings') : t('upgrade')}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
