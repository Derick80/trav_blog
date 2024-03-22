'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { PanelTopCloseIcon, XIcon } from 'lucide-react';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary/70 flex justify-center items-center z-50">
      <dialog ref={dialogRef} className="w-80 max-w-[500px] h-auto max-h-[500px] border-none rounded-md bg-popover p-5 relative items-center justify-center" onClose={onDismiss}>
        {children}
        <Button
          type='button'
          variant='destructive'

          onClick={ onDismiss } className="absolute top-4 right-4">
         <XIcon />
          </Button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}