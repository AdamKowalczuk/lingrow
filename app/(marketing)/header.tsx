import {
  ClerkLoading,
  ClerkLoaded,
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          {/* <Image src="mascot.svg" alt="mascot" width={40} height={40} /> */}
          <h1 className="text-2xl font-extrabold text-indigo-500 tracking-wide">
            Lingrow
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-2">
              <SignInButton mode="modal" fallbackRedirectUrl="/learn">
                <Button size="lg" variant="ghost">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal" fallbackRedirectUrl="/learn">
                <Button size="lg" variant="primary">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
