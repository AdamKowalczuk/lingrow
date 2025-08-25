import Image from 'next/image';
import React, { useCallback } from 'react';
import { useAudio, useKey } from 'react-use';

import { challenges } from '@/db/schema';
import { cn } from '@/lib/utils';

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string | null;
  selected: boolean;
  onClick: () => void;
  status?: 'correct' | 'wrong' | 'none';
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)['type'];
};

const Card = ({
  text,
  imageSrc,
  audioSrc,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: Props) => {
  const [audio, , controls] = useAudio({ src: audioSrc || '' });

  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-3 sm:p-4 lg:p-6 cursor-pointer active:border-b-2',
        selected && 'border-indigo-300 bg-indigo-100 hover:bg-indigo-100',
        selected &&
          status === 'correct' &&
          'border-indigo-300 bg-indigo-100 hover:bg-indigo-100',
        selected &&
          status === 'wrong' &&
          'border-rose-300 bg-rose-100 hover:bg-rose-100',
        disabled && 'pointer-events-none hover:bg-white',
        type === 'ASSIST' && 'lg:p-3 w-full',
      )}
    >
      {audio}
      {imageSrc && (
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-lg overflow-hidden">
            <Image src={imageSrc} fill alt={text} className="object-cover" />
          </div>
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-between',
          type === 'ASSIST' && 'flex-row-reverse',
        )}
      >
        {type === 'ASSIST' && <div />}
        <p
          className={cn(
            'text-neutral-600 text-sm lg:text-base',
            selected && 'text-indigo-500',
            selected && status === 'correct' && 'text-indigo-500',
            selected && status === 'wrong' && 'text-rose-500',
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            'lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold',
            selected && 'border-indigo-300 text-indigo-500',
            selected &&
              status === 'correct' &&
              'border-indigo-500 text-indigo-500',
            selected && status === 'wrong' && 'border-rose-500 text-rose-500',
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;
