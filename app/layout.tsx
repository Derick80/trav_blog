import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils';

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import NavMenu from '@/components/top-navigation';
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <ClerkProvider>

    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background border border-black  flex flex-col   min-w-full w-full antialiased",
         inter.className
      ) }>
     <NavMenu />
<main className="flex min-h-screen flex-col flex-grow items-center border-2 border-teal-400 p-10">
          { children }
          </main>
      </body>
      </html>
      </ClerkProvider>
  );
}
