'use client';

import { DialogDescription } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useHeartsModal } from '@/store/use-hearts-modal';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onClick = () => {
    close();
    router.push('/shop');
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center w-full justify-center mb-5">
              <Image
                src="/donkey/broken-heart.png"
                alt="Mascot"
                height={160}
                width={160}
              />
            </div>
            <DialogTitle className="text-center font-bold text-2xl">
              You ran out of hearts!
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Get Pro for unlimited hearts, or purchase them in the store.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mb-4">
            <div className="flex flex-col gap-y-4 w-full">
              <Button
                variant="primary"
                className="w-full"
                size="lg"
                onClick={onClick}
              >
                Get unlimited hearts
              </Button>
              <Button
                variant="primaryOutline"
                className="w-full"
                size="lg"
                onClick={close}
              >
                No thanks
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeartsModal;
