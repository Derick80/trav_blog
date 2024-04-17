'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth, UserButton } from '@clerk/nextjs'
import { SunIcon } from 'lucide-react'
import { Caption } from './ui/typography'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ACTIVE_ROUTE = 'py-1 px-2 underline'
const INACTIVE_ROUTE = 'py-1 px-2 hover:text-gray-300 hover:bg-gray-700'

export default function NavMenu() {
  const pathname = usePathname()
  const { userId } = useAuth()
  console.log('userId', userId)

  return (
    <nav className='flex items-center justify-between border-b    p-4'>
      <ul className='flex w-full items-center justify-between'>
        <li>
          <UserButton afterSignOutUrl='/' />
        </li>
        <li className={pathname === '/' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
          <Link href='/'>Home</Link>
        </li>
        <li className={pathname === '/about' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
          <Link href='/about'>About</Link>
        </li>

        <li className={pathname === '/gallery' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
          {' '}
          <Link href='/gallery'>Gallery</Link>
        </li>

        {!userId && (
          <>
            <Link href='/sign-in' className='flex items-center'>
              <li
                className={cn(
                  'flex items-center',
                  pathname === '/sign-in' ? ACTIVE_ROUTE : INACTIVE_ROUTE
                )}
              >
                <Caption>Log In</Caption>
              </li>
            </Link>
          </>
        )}
        <li className='flex items-center px-2 py-1 underline'>
          <Tooltip>
            <TooltipTrigger>
              <SunIcon className='h-4 w-4' />
            </TooltipTrigger>
            <TooltipContent>
              <Caption>TBD: Toggle Dark Mode</Caption>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </nav>
  )
}
