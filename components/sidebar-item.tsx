'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href} onClick={onClick}>
        <Image
          src={iconSrc}
          alt={label}
          width={32}
          height={32}
          className="mr-5"
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
