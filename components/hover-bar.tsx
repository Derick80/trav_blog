/*

'post-floating-bar fixed left-0 right-0 z-50 flex h-12 w-full flex-wrap justify-center 2xl:h-14 active animation'

 */

import { ShareIcon, ThumbsUpIcon } from 'lucide-react'

/* 'class="relative mx-auto flex h-12 shrink flex-wrap items-center justify-center rounded-full border-1/2 border-slate-200 bg-white px-5 py-1 text-sm  text-slate-800 shadow-xl dark:border-slate-500 dark:bg-slate-700 dark:text-slate-50 2xl:h-14"' */

export type HoverBarProps = {
  photoId?: string
}
const HoverBar = ({ photoId }: HoverBarProps) => {
  return (
    <div className='post-floating-bar active animation fixed left-0 right-0 z-50 flex h-12 w-full flex-wrap justify-center 2xl:h-14'>
      <div className='border-1/2 relative mx-auto flex h-12 shrink flex-wrap items-center justify-center rounded-full border-primary bg-primary px-5 py-1 text-sm  text-primary-foreground shadow-xl 2xl:h-14'>
        <span className='ml-2 text-xs font-bold'>
          {' '}
          <ThumbsUpIcon />
          Like
        </span>
        <span className='ml-2 text-xs font-bold'>
          {' '}
          <ShareIcon /> Share
        </span>
      </div>
    </div>
  )
}

export default HoverBar
