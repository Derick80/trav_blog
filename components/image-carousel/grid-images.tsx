'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CompassIcon,
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
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import EditableTextField from '../editable-text'
import { useUser } from '@clerk/nextjs'
import { CategoryContainer } from '../category-container'

const ImageGallerySlider = ({
  allCategories,
  images,
  totalImages,
  page,
  role,
  category,
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  category: string
  allCategories: {
    id: string
    title: string
  }[]
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
    categories: {
      id: string
      title: string
    }[]
  }[]
}) => {
  const [queryUrl, setQueryUrl] = React.useState('')

  const limit =
    typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10

  const { isSignedIn, user, isLoaded } = useUser()

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [likeCount, setLikeCount] = React.useState(
    images[currentIndex].likes?.length || 0
  )
  // Use the useEffect hook to update the like count when the currentIndex changes
  React.useEffect(() => {
    setLikeCount(images[currentIndex].likes?.length || 0)
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

  const handlePageChange = (
    pageNumber: number,
    direction: 'previous' | 'next'
  ) => {
    const page = searchParams.page
      ? parseInt(searchParams.page as string)
      : pageNumber

    const targetPage = direction === 'next' ? page + 1 : page - 1

    searchParams.page = targetPage.toString()

    if (targetPage > 0 && targetPage <= totalPageNumber) {
      setQueryUrl(`/?category=${category}&page=${targetPage}&limit=${limit}`)
      setCurrentIndex(
        direction === 'next' ? 0 : images.length - (1 % images.length)
      )
    }
  }
  return (
    <div className='mx-auto flex h-full w-96  flex-col gap-4 md:w-[750px]'>
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

      <div className='overflow-hidsden relative mx-auto h-[225px] w-96 md:h-[500px] md:w-full'>
        <div className='absolute inset-0'>
          {images.map((image, index) => (
            <div
              className={`absolute transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}  left-0 top-0 h-[225px] w-full md:h-[500px]`}
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
          className='absolute -bottom-6 left-0 right-0 z-30 mt-4 flex items-center justify-between p-2'
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className=' rounded-full bg-primary/70 p-1 hover:bg-primary/30'
            onClick={() => {
              likeImage(images[currentIndex].id, images[currentIndex].userId)
            }}
            disabled={!isSignedIn}
          >
            <ThumbsUp className='h-4 w-4 text-primary-foreground' />
          </Button>

          <span className='absolute bottom-0  translate-x-6 translate-y-1/3 rounded-full bg-white px-2 py-1 text-xs text-primary'>
            {likeCount}
          </span>

          <div className='mt-4 flex items-center gap-1'>
            <CompassIcon />
            <EditableTextField
              initialValue={images[currentIndex].city}
              className='w-fit'
              onUpdate={(value) => {
                editCity({ id: images[currentIndex].id, city: value })
              }}
            />
          </div>
          <ShareImageButton id={images[currentIndex].id} />
        </div>
        {/* end of overlay bar */}

        {page > 1 && currentIndex === 0 ? (
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/?category=${category}&page=${page - 1}&limit=${limit}`}
                prefetch={true}
                scroll={false}
                passHref
              >
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute left-0 top-1/2 z-20 h-full -translate-y-1/2 transform rounded-md rounded-r-none bg-primary/20 p-1 hover:bg-primary/80'
                  onClick={() => handlePageChange(page, 'previous')}
                >
                  <ChevronsLeft className='h-6 w-6 text-primary-foreground' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Go to the previous page</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
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
              <TooltipContent>Click to view the previous image</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        )}

        {page < totalPageNumber && currentIndex === images.length - 1 ? (
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/?category=${category}&page=${page + 1}&limit=${limit}`}
                prefetch={true}
                scroll={false}
                passHref
              >
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute right-0 top-1/2 z-20 h-full -translate-y-1/2 transform rounded-md rounded-l-none bg-primary/20 p-1 hover:bg-primary/80'
                  onClick={() => setCurrentIndex(0)}
                >
                  <ChevronsRight className='h-6 w-6 text-primary-foreground' />
                </Button>
              </Link>
              <TooltipContent>Go to the next page</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
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
            </TooltipTrigger>
            <TooltipContent>Click to view the next image</TooltipContent>
          </Tooltip>
        )}
      </div>
      <ImageLinks
        page={page}
        totalImages={totalImages}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <Tooltip>
        <TooltipTrigger>
          <Pagination className='flex flex-col items-center justify-between'>
            <PaginationContent className='relative w-1/2 justify-between'>
              <PaginationItem>
                {page > 1 ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <PaginationPrevious
                        href={queryUrl}
                        prefetch={true}
                        scroll={false}
                        passHref
                        onClick={() => handlePageChange(page, 'previous')}
                      />
                      <TooltipContent>Go to the previous page</TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                ) : (
                  <PaginationLink
                    href={`/?page=${totalPageNumber}&limit=${limit}`}
                    onClick={() => {
                      setCurrentIndex(images.length - 1)
                    }}
                    prefetch={true}
                    scroll={false}
                    passHref
                  >
                    <ChevronsLeft />
                  </PaginationLink>
                )}
              </PaginationItem>
              {pageNumbers.map((pageNumber) => (
                <PaginationItem
                  key={pageNumber}
                  className={`mx-1 ${page === pageNumber ? ' font-bold text-primary underline' : ' text-primary'}`}
                >
                  <PaginationLink
                    href={`/?category=${category}&page=${pageNumber}&limit=${limit}`}
                    onClick={() => setCurrentIndex(0)}
                    prefetch={true}
                    scroll={false}
                    passHref
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink
                  href={`/?category=${category}&page=${page + 1}&limit=${limit}`}
                  onClick={() => {
                    setCurrentIndex(0)
                  }}
                  prefetch={true}
                  scroll={false}
                  passHref
                >
                  {page < totalPageNumber ? (
                    <ChevronRight />
                  ) : (
                    <ChevronsRight />
                  )}
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
            <Muted className='mt-2 text-center'>
              Page {page} of {totalPageNumber}
            </Muted>
          </Pagination>
        </TooltipTrigger>
        <TooltipContent>
          Click to navigate to the corresponding page
        </TooltipContent>
      </Tooltip>
      <CategoryContainer
        role={role}
        imageId={images[currentIndex].id}
        allCategories={allCategories}
        pickedCategory={images[currentIndex].categories.map((cat) => cat)}
      />

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
            <div className='relative flex items-center justify-center gap-1'>
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
          </>
        )}
      </div>
    </div>
  )
}

export default ImageGallerySlider

type ImageLinkProps = {
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
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}
const ImageLinks = ({
  images,
  currentIndex,
  setCurrentIndex,
  totalImages,
  page
}: ImageLinkProps) => {
  const calculateRealImageIndex = (index: number) => {
    return (page - 1) * 10 + index
  }

  return (
    <div className='mx-auto mb-2 mt-6 flex flex-col items-center justify-center gap-1'>
      <Muted>
        {calculateRealImageIndex(currentIndex) + 1} of {totalImages} images
      </Muted>
      <Tooltip>
        <TooltipTrigger>
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
        </TooltipTrigger>
        <TooltipContent>
          Click on the circles to navigate to the corresponding image on the
          current page
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
