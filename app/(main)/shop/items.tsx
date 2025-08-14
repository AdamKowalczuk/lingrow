'use client';

import { refillHearts } from '@/actions/user-progress';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

const POINTS_TO_REFILL = 10;

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

    startTransition(async () => {
      refillHearts().catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl">Refill hearts</p>
          <Button
            onClick={onRefillHearts}
            disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
          >
            {hearts === 5 ? (
              'full'
            ) : (
              <div className="flex items-center">
                <Image src="/points.svg" alt="points" width={20} height={20} />
                <p>{POINTS_TO_REFILL}</p>
              </div>
            )}
          </Button>
        </div>
      </div>
    </ul>
  );
};

export default Items;
