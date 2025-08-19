'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { claimQuestReward } from '@/actions/user-progress';
import { quests, type Quest } from '@/constants';

import { Button } from './ui/button';
import { Progress } from './ui/progress';

type Props = {
  points: number;
  questProgress?: Array<{
    id: number;
    questTitle: string;
    questValue: number;
    currentProgress: number;
    completed: boolean;
    rewardClaimed: boolean;
  }> | null;
  onDataUpdate?: () => void;
};

const Quests = ({ points, questProgress, onDataUpdate }: Props) => {
  const [pending, startTransition] = useTransition();

  const handleClaimReward = (questTitle: string) => {
    startTransition(async () => {
      try {
        const result = await claimQuestReward(questTitle);
        if (result.success) {
          if (onDataUpdate) {
            onDataUpdate();
          }
        }
      } catch {
        toast.error('Nie udało się odebrać nagrody');
      }
    });
  };

  const getQuestProgress = (quest: Quest) => {
    if (!questProgress) return 0;

    const progress = questProgress.find(qp => qp.questTitle === quest.title);
    if (!progress) return 0;

    if (quest.title.includes('XP')) {
      return Math.min((points / quest.value) * 100, 100);
    }

    return 0;
  };

  const isQuestCompleted = (quest: Quest) => {
    const progress = getQuestProgress(quest);
    return progress >= 100;
  };

  const isRewardClaimed = (quest: Quest) => {
    if (!questProgress) return false;

    const progress = questProgress.find(qp => qp.questTitle === quest.title);
    if (!progress) return false;

    return progress.rewardClaimed;
  };

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryOutline">
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {quests.map(quest => {
          const progress = getQuestProgress(quest);
          const completed = isQuestCompleted(quest);
          const rewardClaimed = isRewardClaimed(quest);

          return (
            <div
              key={quest.title}
              className="flex items-center w-full pb-4 gap-x-3"
            >
              <Image src="/points.svg" alt="points" width={40} height={40} />
              <div className="flex flex-col gap-y-2 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-neutral-700 text-sm font-bold">
                    {quest.title}
                  </p>
                  {completed && !rewardClaimed && (
                    <div className="flex items-center gap-x-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleClaimReward(quest.title)}
                        disabled={pending}
                      >
                        Odbierz
                      </Button>
                    </div>
                  )}
                  {completed && rewardClaimed && (
                    <span className="text-xs text-green-600 font-medium">
                      ✅ Odebrano
                    </span>
                  )}
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span></span>
                  {quest.reward.type === 'hearts' && (
                    <span className="flex items-center gap-1">
                      Nagroda: {quest.reward.amount}
                      <Image
                        src="/heart.svg"
                        alt="heart"
                        width={16}
                        height={16}
                      />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Quests;
