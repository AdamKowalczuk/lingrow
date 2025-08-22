'use client';

import { DialogDescription } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { usePracticeModal } from '@/store/use-practice-modal';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const PracticeModal = () => {
  const t = useTranslations('modals.practiceModal');
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center w-full justify-center mb-5">
              <Image src="/heart.svg" alt="heart" height={100} width={100} />
            </div>
            <DialogTitle className="text-center font-bold text-2xl">
              {t('title')}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {t('description')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mb-4">
            <div className="flex flex-col gap-y-4 w-full">
              <Button
                variant="primary"
                className="w-full"
                size="lg"
                onClick={close}
              >
                {t('iUnderstand')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PracticeModal;
