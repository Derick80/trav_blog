/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import React from 'react'
import EditableTextField from '../editable-text'
import { editDescription, editTitle } from '@/app/actions'
import { Muted, Small } from '../ui/typography'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '../ui/card'
import Image from 'next/image'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'
type ImageSliderProps = {
  images: {
    id: string
    cloudinaryPublicId: string
    imageUrl: string
    title: string
    description: string
    city: string
    userId: string
    user: {
      role: string
    }
  }[]
  totalImages: number
  page: number
  limit: number
}
const ImageSlider = ({
  images,
  totalImages,
  page,
  limit
}: ImageSliderProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)


  // Calculate the current page and total pages
  const totalPageNumber = Math.ceil(totalImages / limit)
  // Determine if it's the first image of the first page
  const isFirstImage = page === 1 && activeIndex === 0
  // Determine if it's the last image of the last page
  const isLastImage =
    page === totalPageNumber && activeIndex === images.length - 1
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Determine if double chevrons should be used for navigating to the previous page
  const useDoubleChevronLeft = page > 1 && activeIndex === 0

  // Determine if double chevrons should be used for navigating to the next page
  const useDoubleChevronRight =
    page < totalPageNumber && activeIndex === images.length - 1


  // Access the current image's title using activeIndex
  const {
    id: currentImageId,
    cloudinaryPublicId: currentCloudinaryId,
    title: currentTitle,
    description: currentDescription,
    city: currentCity,
    userId: currentImageUserId,
    ...otherImageProps
  } = images[activeIndex]


  return (
    <Card

    // removing items-center caused less layout shift
    >
      {/* Display the current image's title */ }
      <CardHeader>
        <CardTitle>
          <EditableTextField
            initialValue={ currentTitle } // Use image.title for the title field
            onUpdate={ (value) => {
              editTitle({ id: currentImageId, title: value })
            } } // Function to update the title state
            //   label="Title" // Add label for title doesn't look good atm
            className='text-lg font-semibold' // Optional styling for title
          />
        </CardTitle>
        <CardDescription>
          <EditableTextField
            initialValue={ currentDescription } // Use image.title for the title field
            onUpdate={ (value) => {
              editDescription({
                id: currentImageId,
                description: value
              })
            } } // Function to update the title state
            //   label="Title" // Add label for title doesn't look good atm
            className='text-lg font-semibold' // Optional styling for title
          />
        </CardDescription>
      </CardHeader>

      <CardContent className='relative flex h-96 min-h-96 items-center overflow-hidden rounded-lg md:h-[500px] justify-center md:overflow-y-auto'>
        {/* <div className="relative flex h-96 items-center min-h-96 overflow-hidden rounded-lg"> */ }

        { useDoubleChevronLeft ? (
          <Button
            type='button'
            variant='rounded'
            size='icon'
            className='Z-30 absolute left-7 cursor-pointer items-center  justify-center bg-primary/50 hover:bg-primary/80 focus:outline-none'
            data-carousel-prev
          >
            <Link
              href={ `/?page=${page - 1}&limit=${limit}` }
              prefetch={ true }
              scroll={ false }
              legacyBehavior
              passHref
            >
              <a onClick={ () => setActiveIndex(images.length - 1) }>
                <ChevronsLeft />
              </a>
            </Link>
          </Button>
        ) : (
          <Button
            // control opacity of button here
            type='button'
            variant='rounded'
            size='icon'
            className='Z-30 absolute left-7 cursor-pointer items-center justify-center bg-primary/50 hover:bg-primary/80 focus:outline-none'
            onClick={ () => setActiveIndex(activeIndex - 1) }
            disabled={ isFirstImage }
            data-carousel-prev
          >
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground  hover:text-secondary'>
              {/* SVG for Previous button */ }
              <ChevronLeft />
              <span className='sr-only'>Previous</span>
            </span>
          </Button>
        ) }
        {
          images.map((image, index) => (
            <div
              key={ image.id }
              className={ `p-0 ease-in-out items-center justify-between ${index === activeIndex ? 'block' : 'hidden'} inset-0 opacity-100 transition-opacity` }
            >
              <Image
                src={ image.imageUrl }
                alt={ currentTitle }
                width={ 500 }
                height={ 500 }
                className='object-cover w-full h-full md:object-contain'
              />
            </div>
          )
          )

        }


        { useDoubleChevronRight ? (
          <Button
            type='button'
            variant='rounded'
            size='icon'
            className='Z-30 absolute  right-7 cursor-pointer items-center  justify-center bg-primary/50 hover:bg-primary/80 focus:outline-none'
            data-carousel-next
          >
            <Link
              href={ `/?page=${page + 1}&limit=${limit}` }
              prefetch={ true }
              scroll={ false }
              legacyBehavior
              passHref
            >
              <a onClick={ () => setActiveIndex(0) }>
                <ChevronsRight />
              </a>
            </Link>
          </Button>
        ) : (
          <Button
            // control opacity of button here
            type='button'
            variant='rounded'
            size='icon'
            className='Z-30 absolute  right-7 cursor-pointer items-center  justify-center bg-primary/50 hover:bg-primary/80 focus:outline-none'
            disabled={ isLastImage }
            onClick={ () => setActiveIndex((prevIndex) => prevIndex + 1) }
            data-carousel-next
          >
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground hover:text-secondary '>
              {/* SVG for Next button */ }
              <ChevronRight />
              <span className='sr-only'>Next</span>
            </span>
          </Button>
        ) }
        {/* </div> */ }
      </CardContent>

      <CardFooter className='flex w-full flex-col'>
        <Small className='text-right'>City: { currentCity }</Small>

        <PaginationComponent
          total={ totalImages }
          setActiveIndex={ setActiveIndex }
          searchParams={ { page: page, limit: limit } }
        />
        {/* Description container */ }



        {/* Place ImageLinks here to show circles beneath the image */ }
        <ImageLinks
          images={ images }
          currentIndex={ activeIndex }
          setCurrentIndex={ setActiveIndex }
        />
        <Muted>Total Images: { totalImages }</Muted>

      </CardFooter>
    </Card>
  )
}

export default ImageSlider


// Pagination component

const PaginationComponent = ({ total, searchParams, setActiveIndex }: {
  total: number,
  searchParams: {
    [key: string]: string | string[] | number | undefined
  },
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}) => {



  const page = searchParams.page ? parseInt(searchParams.page as string) : 1

  const limit =
    typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10
  console.log(page, 'page in pagination component');


  // const $skip = Number(searchParams?.get("$skip")) || 0
  // const $top = Number(searchParams?.get("$limit")) || 10
  const totalPages = Math.ceil(total / limit)

  const currentPage = page

  const maxPages = 7
  const halfMaxPages = Math.floor(maxPages / 2)
  const canPageBackwards = page > 1
  const canPageForwards = page < totalPages
  const pageNumbers = [] as Array<number>
  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    let startPage = currentPage - halfMaxPages
    let endPage = currentPage + halfMaxPages
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1
      startPage = 1
    }
    if (endPage > totalPages) {
      startPage -= endPage - totalPages
      endPage = totalPages
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
  }
  return (
    <Pagination>
      <PaginationContent
        className='justify-between w-1/2'
      >
        <PaginationItem
          onClick={ () => setActiveIndex(0) }

        >
          {
            canPageBackwards ? (
              <PaginationPrevious href={ `/?page=${page - 1}&limit=${limit}` } />
            ) : (
              <PaginationLink
                href={ `/?page=${totalPages}$limit${limit}` }
                title='Go to last page'
                id='goto-last-page'
                legacyBehavior
                prefetch={ true }
                scroll={ false }
                passHref
              >
                <ChevronsLeft />
              </PaginationLink>
            )

          }
        </PaginationItem>
        { pageNumbers.map((pageNumber) => (
          <PaginationItem key={ pageNumber }
            onClick={ () => setActiveIndex(0) }
            className={ pageNumber === currentPage ? 'text-primary underline' : '' }
          >
            <PaginationLink
              href={ `/?page=${pageNumber}&limit=${limit}` }

              legacyBehavior
              prefetch={ true }
              scroll={ false }
              passHref
            >
              { pageNumber }
            </PaginationLink>
          </PaginationItem>
        )) }
        <PaginationItem
          onClick={ () => setActiveIndex(0) }


        >
          { canPageForwards ? (
            <PaginationNext href={ `/?page=${page + 1}&limit=${limit}` }
              prefetch={ true }
              scroll={ false }
              legacyBehavior
              passHref
            />
          ) : (
            <PaginationLink
              href={ `/` }
              title='Go to first page'
              id='goto-first-page'
              legacyBehavior
              prefetch={ true }
              scroll={ false }
              passHref
            >
              <ChevronsRight />
            </PaginationLink>
          )
          }
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}



type ImageLinkProps = {
  images: {
    id: string
    cloudinaryPublicId: string
    imageUrl: string
    title: string
    description: string
    city: string
    userId: string
    user: {
      role: string
    }
  }[]
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}
const ImageLinks = ({
  images,
  currentIndex,
  setCurrentIndex
}: ImageLinkProps) => {
  console.log(currentIndex, 'currentIndex')

  return (
    <div className='m-1 flex w-full items-center justify-center '>
      {/* Render circles for each image */ }
      { images.map((_, index) => (
        <div
          key={ index }
          className={ `mx-1 h-4 w-4 rounded-full p-2 ${currentIndex === index ? 'bg-[#F53A87]' : 'bg-primary'
            }` }
          onClick={ () => setCurrentIndex(index) } // Navigate to the corresponding image
        />
      )) }
    </div>
  )
}

