'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

type Props = {
  label: string;
  iconSrc: string;
  href: string;
  onClick?: () => void;
};

const SidebarItem = ({ label, href, iconSrc, onClick }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className={cn(
        'justify-start h-[52px] relative overflow-hidden transition-all duration-200',
        active
          ? 'bg-indigo-50 border-2 border-indigo-200 text-indigo-700 shadow-sm'
          : 'hover:bg-gray-50 hover:shadow-sm hover:scale-[1.02]',
      )}
      asChild
    >
      <Link href={href} onClick={onClick}>
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors',
            active ? 'bg-indigo-100' : 'bg-gray-100 group-hover:bg-indigo-50',
          )}
        >
          <Image
            src={iconSrc}
            alt={label}
            width={20}
            height={20}
            className={cn(
              'transition-colors',
              active
                ? 'text-indigo-600'
                : 'text-gray-600 group-hover:text-indigo-500',
            )}
          />
        </div>
        <span className="font-medium">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
