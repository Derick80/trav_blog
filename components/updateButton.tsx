'use client'
import React from 'react'
import { Button } from './ui/button'
import { Small } from './ui/typography'
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
    return searchParams.category === typeof 'string'
      ? searchParams.category.split(',')
      : []
  })

  const router = useRouter()

  // Effect to update the URL whenever activeCategories changes
  React.useEffect(() => {
    const nextCategory = activeCategories.join(',')
    if (nextCategory) {
      // Pushing updated query to the URL
      router.push(`/?category=${encodeURIComponent(nextCategory)}`, {
        scroll: false
      })
    } else {
      // If no categories are active, remove the query parameter
      router.push('/', { scroll: false })
    }
  }, [activeCategories, router])

  function handleCategoryClick(title: string) {
    setActiveCategories((prevCategories) => {
      const currentIndex = prevCategories.indexOf(title)
      if (currentIndex > -1) {
        // Remove category if it's already included
        return prevCategories.filter((category) => category !== title)
      } else {
        // Add category if not included
        return [...prevCategories, title]
      }
    })
  }

  const handleReset = () => {
    router.push('/', { scroll: false })
  }

  return (
    <div className='flex flex-wrap gap-4'>
      <Link href='/'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='relative z-20 mr-4 rounded-full bg-primary/70 p-1 hover:bg-primary/30'
          onClick={() => handleReset}
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
              variant='ghost'
              size='default'
              key={category.id}
              disabled={
                category.count === 0 &&
                !activeCategories.includes(category.title)
              }
              onClick={() => handleCategoryClick(category.title)}
              className={clsx(
                'relative z-20 rounded-full bg-primary/70 p-1 hover:bg-primary/30',
                activeCategories.includes(category.title) && 'bg-primary/30'
              )}
            >
              <Small>
                <span className='mr-1'>{category.title}</span>
              </Small>
              <span className='absolute bottom-0 right-0 translate-x-5 translate-y-2 rounded-full bg-white px-2 py-1 text-xs text-primary'>
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
