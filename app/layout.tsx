import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

import Link from 'next/link'
import { getServerSession } from 'next-auth'
import NavMenu from '@/components/top-navigation'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Gallery with Next.js App router',
  description: 'An image gallery with Next.js App router'
}

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={cn(
            'flex min-h-screen w-full min-w-full  flex-col border   border-black bg-background antialiased',
            inter.className
          )}
        >
          <NavMenu />
          <main className='flex flex-grow flex-col items-center border-2 border-teal-400 p-1 md:p-5'>
            {props.children}
            {props.modal}
          </main>
          <div id='modal-root' />
        </body>
      </html>
    </ClerkProvider>
  )
}
