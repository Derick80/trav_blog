'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CompassIcon,
  InfoIcon,
  LocateFixed,
  ShareIcon,
  ThumbsUp
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Muted, Small } from '../ui/typography'
import { Button } from '../ui/button'
import Link from 'next/link'
import { editCity, editDescription, editTitle, likeImage } from '@/app/actions'
import { ShareImageButton } from './share-button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious
} from '../ui/pagination'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import EditableTextField from '../editable-text'

const ImageGallerySlider = ({
  images,
  totalImages,
  page,
  role
}: {
  totalImages: number
  page: number
  role: string
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
  const [likeCount, setLikeCount] = React.useState(
    images[currentIndex].likes.length
  )
  // Use the useEffect hook to update the like count when the currentIndex changes
  React.useEffect(() => {
    setLikeCount(images[currentIndex].likes.length)
  }, [currentIndex, images])

  const totalPageNumber = Math.ceil(totalImages / limit)

  const isFirstImage = page === 1 && currentIndex === 0
  const isLastImage =
    page === totalPageNumber && currentIndex === images.length - 1

  const pageNumbers = [] as Array<number>
  for (let i = 1; i <= totalPageNumber; i++) {
    pageNumbers.push(i)
  }

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const showPreviousImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }
  return (
    <div className='mx-auto flex h-full  w-96 flex-col md:w-[500px]'>
      {role === 'admin' ? (
        <EditableTextField
          initialValue={images[currentIndex].title}
          className='italic text-muted-foreground '
          onUpdate={(value) => {
            editTitle({ id: images[currentIndex].id, title: value })
          }}
        />
      ) : (
        <Muted className='flex h-fit max-h-12 min-h-12 items-end text-left'>
          {images[currentIndex].title}
        </Muted>
      )}

      <div className='overflow-hidsden relative mx-auto h-[225px] w-96 md:h-[500px] md:w-[500px]'>
        <div className='absolute inset-0'>
          {images.map((image, index) => (
            <div
              className={`absolute   transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}  left-0 top-0 h-[225px] w-full md:h-[500px]`}
              style={{ zIndex: images.length - index }}
              key={image.id}
            >
              <Image
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='
                src={images[currentIndex].imageUrl}
                alt={images[currentIndex].title}
                // width={ 300 }
                // height={ 225 }

                fill={true}
                sizes={
                  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
                className='rounded-md object-cover'
                style={{
                  zIndex: images.length - index
                }} // Ensure proper stacking order
              />
            </div>
          ))}
        </div>
        {/* Overlay Bar */}
        <div
          className='absolute -bottom-6 left-0 right-0 z-30 flex items-center justify-between p-2'
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <div className='relative flex items-center justify-center'>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='rounded-full bg-primary/70 p-1 hover:bg-primary/30'
              onClick={() => {
                likeImage(images[currentIndex].id, images[currentIndex].userId)
              }}
            >
              <ThumbsUp className='h-4 w-4 text-primary-foreground' />
            </Button>
            <span className='absolute bottom-0 right-0 translate-x-1/3 translate-y-1/2 rounded-full bg-white px-2 py-1 text-xs text-primary'>
              {likeCount}
            </span>
          </div>
          <Link
            href={`/photos/${images[currentIndex].id}`} // Link to the user's profile
            passHref
            className='rounded-full bg-primary/70 p-1 text-primary-foreground hover:bg-primary/30'
          >
            View Full Photo
          </Link>
          <ShareImageButton id={images[currentIndex].id} />
        </div>

        {page > 1 && currentIndex === 0 ? (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute left-0 top-1/2 z-20 h-full -translate-y-1/2 transform rounded-md rounded-r-none  bg-primary/20 p-1 hover:bg-primary/80'
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
                <ChevronsLeft className='h-6 w-6 text-primary-foreground' />
              </a>
            </Link>
          </Button>
        ) : (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute left-0 top-1/2 z-20 h-full -translate-y-1/2 transform rounded-full bg-primary/20 p-1 hover:bg-primary/80'
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
            className='absolute right-0 top-1/2 z-20 h-full -translate-y-1/2 transform rounded-md rounded-l-none bg-primary/20 p-1 hover:bg-primary/80'
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
                <ChevronsRight className='h-6 w-6 text-primary-foreground' />
              </a>
            </Link>
          </Button>
        ) : (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute right-0 top-1/2 z-20 h-full -translate-y-1/2 transform rounded-full bg-primary/20 p-1 hover:bg-primary/80'
            disabled={isLastImage}
            onClick={showNextImage}
          >
            <ChevronRight className='h-6 w-6 text-primary-foreground' />
          </Button>
        )}
      </div>
      <ImageLinks
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <Small className='mx-auto text-primary'>Navigate by Page</Small>
      <Pagination>
        <PaginationContent className='w-1/2 justify-between'>
          <PaginationItem
            onClick={() => {
              setCurrentIndex(0)
            }}
          >
            {page > 1 ? (
              <PaginationPrevious
                href={`/?page=${page - 1}&limit=${limit}`}
                prefetch={true}
                scroll={false}
                legacyBehavior
                passHref
              />
            ) : (
              <PaginationLink
                href={`/?page=${totalPageNumber}&limit=${limit}`}
                prefetch={true}
                scroll={false}
                legacyBehavior
                passHref
              >
                <ChevronsLeft />
              </PaginationLink>
            )}
          </PaginationItem>
          {pageNumbers.map((pageNumber) => (
            <PaginationItem
              key={pageNumber}
              onClick={() => {
                setCurrentIndex(0)
              }}
              className={`mx-1 ${page === pageNumber ? ' font-bold text-primary underline' : ' text-primary'}`}
            >
              <PaginationLink
                href={`/?page=${pageNumber}&limit=${limit}`}
                prefetch={true}
                scroll={false}
                legacyBehavior
                passHref
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            onClick={() => {
              setCurrentIndex(0)
            }}
          >
            <PaginationLink
              href={
                page < totalPageNumber
                  ? `/?page=${page + 1}&limit=${limit}`
                  : `/?page=1&limit=${limit}`
              }
              prefetch={true}
              scroll={false}
              legacyBehavior
              passHref
            >
              {page < totalPageNumber ? <ChevronRight /> : <ChevronsRight />}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className='items-cesnter mt-2 flex w-full flex-col justify-center gap-1 md:gap-4'>
        {role === 'admin' ? (
          <>
            <EditableTextField
              initialValue={images[currentIndex].description}
              className=''
              onUpdate={(value) => {
                editDescription({
                  id: images[currentIndex].id,
                  description: value
                })
              }}
            />
            <div className='flex items-center justify-center gap-1'>
              <CompassIcon />
              <EditableTextField
                initialValue={images[currentIndex].city}
                className=''
                onUpdate={(value) => {
                  editCity({ id: images[currentIndex].id, city: value })
                }}
              />
            </div>
          </>
        ) : (
          <>
            <Muted className='text-left'>
              {images[currentIndex].description}
            </Muted>

            <div className='flex items-center justify-center gap-1'>
              <LocateFixed />
              <Muted>{images[currentIndex].city}</Muted>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageGallerySlider

type ImageLinkProps = {
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
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}
const ImageLinks = ({
  images,
  currentIndex,
  setCurrentIndex
}: ImageLinkProps) => {
  return (
    <div className='mx-auto mt-6 flex flex-col items-center justify-center gap-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon />
          </TooltipTrigger>
          <TooltipContent>
            Click on the circles to navigate to the corresponding image
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className='flex w-full items-center justify-center '>
        {/* Render circles for each image */}
        {images.map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-4 w-4 rounded-full p-2 ${
              currentIndex === index ? 'bg-[#F53A87]' : 'bg-primary'
            }`}
            onClick={() => setCurrentIndex(index)} // Navigate to the corresponding image
          />
        ))}
      </div>
    </div>
  )
}
