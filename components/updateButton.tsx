'use client'
import React from 'react'
import { Button } from './ui/button'
import { Caption, Small } from './ui/typography'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

export const UpdateButton = ({
  categories,
  searchParams,
  totalImages
}: {
  categories: { id: string; title: string; count: number }[]
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  totalImages: number
}) => {
  const [activeCategories, setActiveCategories] = React.useState(() => {
    return typeof searchParams.category === 'string'
      ? searchParams.category.split(',')
      : []
  })

  const router = useRouter()
  React.useEffect(() => {
    const nextCategory = activeCategories.join(',')
    router.push(
      `/?${nextCategory ? `category=${encodeURIComponent(nextCategory)}` : ''}`,
      {
        scroll: false
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategories]) // Removed router from dependencies to prevent unnecessary re-runs

  function handleCategoryClick(title: string) {
    setActiveCategories((prevCategories) => {
      const currentIndex = prevCategories.indexOf(title)
      return currentIndex > -1
        ? prevCategories.filter((cat) => cat !== title)
        : [...prevCategories, title]
    })
  }

  const handleReset = () => {
    setActiveCategories([])
    router.push('/', { scroll: false })
  }

  return (
    <div className='flex flex-wrap gap-1 md:gap-2'>
      <Link
        href='/'
      prefetch={true}
      >
        <Button
          type='button'
          variant='outline'
          size='xs'
          className='relative z-20 mr-4 rounded-full bg-primary/70 p-1 hover:bg-primary/30'
          onClick={handleReset}
        >
          <Small>
            <span className='mr-1'>All</span>
          </Small>
          <span className='absolute bottom-0 right-0 translate-x-5 translate-y-1 rounded-full bg-white px-2 py-1 text-xs text-primary'>
            {totalImages}
          </span>
        </Button>
      </Link>
      {categories.map(
        (category) =>
          category.count >= 0 && (
            <Button
              type='button'
              size='xs'
              variant='outline'
              key={category.id}
              onClick={() => handleCategoryClick(category.title)}
              className={clsx(
                'relative z-20 mr-4 rounded-full bg-primary/70 hover:bg-primary/30',
                { 'bg-primary/30': activeCategories.includes(category.title) }
              )}
              disabled={
                category.count === 0 &&
                !activeCategories.includes(category.title)
              }
            >
              <Caption
              className='text-primary-foreground'
              >
                <span className='mr-1'>{category.title}</span>
              </Caption>
              <span className='absolute bottom-0 right-0 translate-x-5 translate-y-2 rounded-full bg-primary-foreground px-2 py-1 text-xs text-primary'>
                {category.count}
              </span>
            </Button>
          )
      )}
    </div>
  )
}

export const ResetButton = ({ totalImages }: { totalImages: number }) => {
  const searchParams = new URLSearchParams(window.location.search)

  const resetCategory = () => {
    searchParams.delete('category')
    window.location.search = searchParams.toString()
  }

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      className='relative z-20 rounded-full bg-primary/70 p-1 hover:bg-primary/30'
      onClick={resetCategory}
    >
      <Small>
        <span className='mr-1'>All</span>
      </Small>
      <span className='absolute bottom-0 right-0 translate-x-5 translate-y-1 rounded-full bg-white px-2 py-1 text-xs text-primary'>
        {totalImages}
      </span>
    </Button>
  )
}
