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
        'h-full border-2 rounded-xl border-b-4 hover:bg-gray-50 p-3 sm:p-4 lg:p-6 cursor-pointer active:border-b-2 transition-all duration-200 shadow-sm hover:shadow-md',
        selected &&
          'border-indigo-400 bg-indigo-50 hover:bg-indigo-50 shadow-md',
        selected &&
          status === 'correct' &&
          'border-green-400 bg-green-50 hover:bg-green-50 shadow-md',
        selected &&
          status === 'wrong' &&
          'border-rose-400 bg-rose-50 hover:bg-rose-50 shadow-md',
        disabled && 'pointer-events-none hover:bg-white opacity-60',
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
            'text-gray-700 text-sm lg:text-base font-medium',
            selected && 'text-indigo-600',
            selected && status === 'correct' && 'text-green-600',
            selected && status === 'wrong' && 'text-rose-600',
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            'lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-gray-500 lg:text-[15px] text-xs font-semibold transition-colors',
            selected && 'border-indigo-400 text-indigo-600',
            selected &&
              status === 'correct' &&
              'border-green-400 text-green-600',
            selected && status === 'wrong' && 'border-rose-400 text-rose-600',
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;
