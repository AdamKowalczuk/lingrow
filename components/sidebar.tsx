'use client';

import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale } from '@/hooks/use-locale';
import { cn } from '@/lib/utils';

import SidebarItem from './sidebar-item';

type Props = {
  className?: string;
  onItemClick?: () => void;
};

export const Sidebar = ({ className, onItemClick }: Props) => {
  const t = useTranslations('sidebar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col',
        className,
      )}
    >
      <Link href={`/${locale}/learn`} onClick={onItemClick}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.png" alt="mascot" width={40} height={40} />
          <h1 className="text-2xl font-extrabold text-indigo-500 tracking-wide">
            Lingrow
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label={t('learn')}
          href={`/${locale}/learn`}
          iconSrc="/learn.svg"
          onClick={onItemClick}
        />
        <SidebarItem
          label={t('leaderboard')}
          href={`/${locale}/leaderboard`}
          iconSrc="/leaderboard.svg"
          onClick={onItemClick}
        />
        <SidebarItem
          label={t('quests')}
          href={`/${locale}/quests`}
          iconSrc="/quests.svg"
          onClick={onItemClick}
        />
        <SidebarItem
          label={t('shop')}
          href={`/${locale}/shop`}
          iconSrc="/shop.svg"
          onClick={onItemClick}
        />
      </div>

      {/* Language Switcher */}
      <div className="px-4 pb-4">
        <div className="flex flex-col gap-y-2">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            {t('language')}
          </div>
          <Select
            value={locale}
            onValueChange={value => {
              const newPath = pathname.replace(/^\/[a-z]{2}/, `/${value}`);
              router.push(newPath);
              // Zamknij sidebar po zmianie języka na mobile
              if (onItemClick) {
                onItemClick();
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pl">🇵🇱 Polski</SelectItem>
              <SelectItem value="en">🇺🇸 English</SelectItem>
              <SelectItem value="jp">🇯🇵 日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
};
