'use client';

import { DialogDescription } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useLocale } from '@/hooks/use-locale';
import { useExitModal } from '@/store/use-exit-modal';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const ExitModal = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('modals.exitModal');
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

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
              <Image
                src="/donkey/broken-heart.png"
                alt={t('mascot')}
                height={160}
                width={160}
              />
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
                {t('keepLearning')}
              </Button>
              <Button
                variant="dangerOutline"
                className="w-full"
                size="lg"
                onClick={() => {
                  close();
                  router.push(`/${locale}/learn`);
                }}
              >
                {t('endSession')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExitModal;
