'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { createStripeUrl } from '@/actions/user-subscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const locale = useLocale();
  const t = useTranslations('shopItems');
  const tCommon = useTranslations('common');
  const [pending, startTransition] = useTransition();

  const onUpgrade = () => {
    startTransition(async () => {
      createStripeUrl(locale)
        .then((res: { data: string | null }) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error(tCommon('somethingWentWrong')));
    });
  };

  return (
    <div className="w-full space-y-4">
      <Card className="transition-all duration-300 hover:shadow-md hover:border-indigo-300/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Image
                  src="/unlimited.svg"
                  alt={t('unlimited')}
                  width={24}
                  height={24}
                  className="text-yellow-600"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {t('unlimitedHearts')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('unlimitedDescription')}
                </p>
              </div>
            </div>

            <Button onClick={onUpgrade} disabled={pending}>
              {hasActiveSubscription ? t('settings') : t('upgrade')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Items;
