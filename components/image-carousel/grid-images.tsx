'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShareIcon,
  ThumbsUp
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Muted } from '../ui/typography'
import { Button } from '../ui/button'
import Link from 'next/link'

const GridCarousel = ({
  images,
  totalImages,
  page
}: {
  totalImages: number
  page: number
  images: {
    id: string
    cloudinaryPublicId: string
    imageUrl: string
    title: string
    description: string
    city: string
    userId: string
    likes: {
      userId: string
      photoId: string
    }[]
  }[]
}) => {
  const limit = 10
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const totalPageNumber = Math.ceil(totalImages / limit)

  const isFirstImage = page === 1 && currentIndex === 0
  const isLastImage =
    page === totalPageNumber && currentIndex === images.length - 1

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const showPreviousImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }
  return (
    <div className='flex h-full w-full flex-col'>
      <Muted>{images[currentIndex].title}</Muted>
      <div className='relative h-[225px] w-[300px]'>
        <div className='absolute inset-0'>
          {images.map((image, index) => (
            <div
              className='absolute left-0 top-0 h-[225px] w-full'
              style={{ zIndex: images.length - index }}
              key={image.id}
            >
              <Image
                src={images[currentIndex].imageUrl}
                alt={images[currentIndex].title}
                // width={ 300 }
                // height={ 225 }
                fill={true}
                className='rounded-md'
                style={{
                  zIndex: images.length - index,
                  objectFit: 'cover'
                }} // Ensure proper stacking order
              />

              <Muted className='absolute left-0 top-0 z-40 bg-primary p-2 font-semibold text-black'>
                {currentIndex}
              </Muted>
            </div>
          ))}
        </div>
        {/* Overlay Bar */}
        <div
          className='absolute -bottom-6 left-0 right-0 z-30 flex items-center justify-between p-2'
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={showPreviousImage}
            className='rounded-full bg-primary/70 p-1 hover:bg-primary/30'
          >
            <ThumbsUp className='h-4 w-4 text-primary-foreground' />
          </Button>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={showNextImage}
            className='rounded-full bg-primary/70 p-1 hover:bg-primary/30'
          >
            <ShareIcon className='h-4 w-4 text-primary-foreground' />
          </Button>
        </div>

        {page > 1 && currentIndex === 0 ? (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute left-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-primary p-1 hover:bg-primary/80'
            onClick={() => setCurrentIndex(images.length - 1)}
            disabled={isFirstImage}
          >
            <Link
              href={`/?page=${page - 1}&limit=${limit}`}
              prefetch={true}
              scroll={false}
              legacyBehavior
              passHref
            >
              <a>
                <ChevronsLeft />
              </a>
            </Link>
          </Button>
        ) : (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute left-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-primary p-1 hover:bg-primary/80'
            onClick={showPreviousImage}
            disabled={isFirstImage}
          >
            <ChevronLeft className='h-6 w-6 text-primary-foreground ' />
          </Button>
        )}

        {page < totalPageNumber && currentIndex === images.length - 1 ? (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute right-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-primary p-1 hover:bg-primary/80'
            onClick={() => setCurrentIndex(0)}
          >
            <Link
              href={`/?page=${page + 1}&limit=${limit}`}
              prefetch={true}
              scroll={false}
              legacyBehavior
              passHref
            >
              <a>
                <ChevronsRight />
              </a>
            </Link>
          </Button>
        ) : (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute right-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-primary p-1 hover:bg-primary/80'
            onClick={showNextImage}
          >
            <ChevronRight className='h-6 w-6 text-primary-foreground' />
          </Button>
        )}
      </div>
      <Muted className='mt-6'>{images[currentIndex].description}</Muted>
      <Muted>{images[currentIndex].city}</Muted>
    </div>
  )
}

export default GridCarousel
