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
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 border-gray-200/50 flex-col bg-gradient-to-br from-indigo-50/30 via-white to-white shadow-lg',
        className,
      )}
    >
      <Link href={`/${locale}/learn`} onClick={onItemClick}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-sm"></div>
            <Image
              src="/logo.png"
              alt="mascot"
              width={40}
              height={40}
              className="relative z-10 drop-shadow-sm"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-indigo-500 tracking-wide drop-shadow-sm">
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
          <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pl">🇵🇱 {tFooter('polish')}</SelectItem>
            <SelectItem value="en">🇬🇧 {tFooter('english')}</SelectItem>
            <SelectItem value="jp">🇯🇵 {tFooter('japanese')}</SelectItem>
          </SelectContent>
        </Select>
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
