"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";



export default function NavMenu() {
  const pathname = usePathname();
    const { userId } = useAuth();

  return (
           <nav className="flex items-center justify-between p-4    border-b">

      <ul
        className='flex flex-col space-x-4'
      >
        <li>
          <UserButton />
        </li>
        {
          !userId && (
             <><Link
              href='/sign-in'
            >
              <li
                className={ pathname === "/sign-in" ? ACTIVE_ROUTE : INACTIVE_ROUTE }
              >
                Sign In
              </li>
            </Link><Link
              href='/sign-up'
            >
                <li
                  className={ pathname === "/sign-up" ? ACTIVE_ROUTE : INACTIVE_ROUTE }
                >
                  Sign up
                </li>
              </Link></>
          )
       }
      </ul>

          <ul
          className='flex space-x-4'
          >
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/about">
          <li
            className={
              pathname === "/about" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            about Route
          </li>
        </Link>
        <Link href="/gallery">
          <li
            className={
              pathname === "/gallery" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
                      Gallery
                  </li>
        </Link>

          </ul>
    </nav>
  );
}