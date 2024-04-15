import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import NavMenu from '@/components/top-navigation'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travel Image Gallery',
  description: 'An image gallery that uses the Next.js App router'
}

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <TooltipProvider>
      <html lang='en'>
        <body
          className={cn(
            'flex min-h-screen w-full min-w-full  flex-col  bg-background antialiased',
            inter.className
          )}
        >
          <NavMenu />
          <main className='flex flex-grow flex-col items-center  p-1 md:p-5'>
            {props.children}
            {props.modal}
          </main>
          <div id='modal-root' />
        </body>
      </html>
      </TooltipProvider>
    </ClerkProvider>
  )
}
