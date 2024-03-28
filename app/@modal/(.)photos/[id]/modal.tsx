'use client'

import { type ElementRef, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { PanelTopCloseIcon, XIcon } from 'lucide-react'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  return createPortal(
    <div className='absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-primary/70'>
      <dialog
        ref={dialogRef}
        className='relative h-auto max-h-[500px] w-80 max-w-[500px] items-center justify-center rounded-md border-none bg-popover p-5'
        onClose={onDismiss}
      >
        {children}
        <Button
          type='button'
          variant='destructive'
          onClick={onDismiss}
          className='absolute right-4 top-4'
        >
          <XIcon />
        </Button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  )
}
