"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LogIn, SunIcon, UserRoundPlus } from "lucide-react";
import { Caption, P, Small } from "./ui/typography";
import { cn } from '@/lib/utils';

const ACTIVE_ROUTE = "py-1 px-2 underline";
const INACTIVE_ROUTE =
  "py-1 px-2 hover:text-gray-300 hover:bg-gray-700";

export default function NavMenu() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b    p-4">


      <ul className="flex w-full justify-between items-center">
        <li>
          <UserButton afterSignOutUrl="/" />
        </li>
        <li className={ pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE }>
                  <Link href="/">

            Home
                    </Link>

          </li>
        <li className={ pathname === "/about" ? ACTIVE_ROUTE : INACTIVE_ROUTE }>
                  <Link href="/about">

            About
              </Link>
          </li>

          <li
            className={pathname === "/gallery" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          >        <Link href="/gallery">

            Gallery
                    </Link>

          </li>

            {!userId && (
          <>
            <Link href="/sign-in" className="flex items-center">
              <li
                className={
                 cn('flex items-center', pathname === "/sign-in" ? ACTIVE_ROUTE : INACTIVE_ROUTE)
                }
              >
                <Caption>Log In</Caption>

              </li>
            </Link>
          </>
        ) }
        <li
        className='flex items-center py-1 px-2 underline'
        >
          <SunIcon
          className='w-4 h-4'
          />
        </li>
      </ul>
    </nav>
  );
}
