import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};
const Card = ({ id, title, imageSrc, onClick, disabled, active }: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'h-full border-2 rounded-xl border-b-4 hover:bg-gray-50 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px] transition-all duration-200 shadow-sm hover:shadow-md',
        disabled && 'pointer-events-none opacity-50',
        active && 'border-indigo-400 bg-indigo-50 hover:bg-indigo-50 shadow-md',
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-indigo-600 flex items-center justify-center p-1.5 shadow-sm">
            <Check className="text-white stroke-[3] h-4 w-4" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        width={93.33}
        height={70}
        className="rounded-lg object-cover transition-transform duration-200 hover:scale-105"
      />
      <p className="text-gray-700 text-center font-bold mt-3 text-sm lg:text-base">
        {title}
      </p>
    </div>
  );
};

export default Card;
