/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, MapPin, PencilIcon } from 'lucide-react'
import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Muted, Small } from '../ui/typography'
import EditableTextField from '../editable-text'
import { editTitle, editDescription } from '@/app/actions'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { getImageBuilder, getImgProps } from './images'
import Link from 'next/link'

const ImageCarousel = ({
  images,
  totalImages,
  searchParams,
  startPage,
  endPage
}: {
  images: {
    id: string
    cloudinaryPublicId: string
    imageUrl: string
    title: string
    description: string
    city: string
    userId: string
  }[]
  totalImages: number
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  startPage: number
  endPage: number
  }) => {


  const limit =
    typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const [currentIndex, setCurrentIndex] = React.useState(0)
    const [currentImage, setCurrentImage] = React.useState(images[0]);
  React.useEffect(() => {
    setCurrentImage(images[currentIndex]);
  }, [currentIndex, images]);

 React.useEffect(() => {
    // Reset currentIndex when page changes
    setCurrentIndex(0);
 }, [page]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };



  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)

  }

  const isFirstPage = page === 1
  //determine if there is a next image to display

  const hasNext = currentIndex < images.length - 1

  //determine if there is a previous image to display

  const hasPrevious = currentIndex > 0

  const isLastPage = page === endPage




  const paginationLinks = []

  for (let i = startPage; i <= endPage; i++) {
    paginationLinks.push(
      <PaginationLink
        key={i}
        href={`/?page=${i}&limit=${limit}`}
        isActive={i === page}
      >
        {i}
      </PaginationLink>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <EditableTextField
            initialValue={currentImage.title}
            onUpdate={(value) => {
              editTitle({ id: currentImage.id, title: value })
            } }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className='relative'>
        <div className='aspect-[3/4] md:aspect-[3/2]'>
          {
            <img
              title={currentImage.cloudinaryPublicId}
              {...getImgProps(
                getImageBuilder(
                  currentImage.cloudinaryPublicId,
                  currentImage.title,

                ),
                {
                  widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
                  sizes: [
                    '(max-width:1023px) 80vw',
                    '(min-width:1024px) and (max-width:1620px) 67vw',
                    '1100px'
                  ],
                  transformations: {
                    quality: 'auto',
                    format: 'webp'
                  }
                }
              )}
            />
          }
        </div>

        <div className='flex flex-col space-y-2'>
          <Muted className='italic mt-2 indent-2'>
            <EditableTextField
              initialValue={currentImage.description}
              onUpdate={(value) => {
                editDescription({ id: currentImage.id, description: value })

              }}
            />
          </Muted>
          <Small className='text-right'>
            {currentImage.city}
            <MapPin className='h-4 w-4 inline-block ml-1' />
          </Small>
        </div>
      </CardContent>

        <div className='flex items-center justify-center border-2'>
          {/* Render circles for each image */}
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded-full mx-1 ${
                currentIndex === index ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)} // Navigate to the corresponding image
            />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
          { hasPrevious ? (
            <Button className='z-10 ml-4' onClick={ goToPrevious }
            disabled={isFirstPage && !hasPrevious}
            >
              <ChevronLeft className='bg-blue-500 h-8 w-8' />
            </Button>
          ) :(
            <PaginationPrevious
              href={`/?page=${page - 1}&limit=${limit}`}
              onClick={goToPrevious}
                prefetch={ true }
              disabled={isFirstPage}
              >
              </PaginationPrevious>
            )
          }

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {paginationLinks}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {hasNext ? (
            <Button className='z-10 mr-4' onClick={ goToNext }


            >
                <ChevronRight className='h-8 w-8 ' />
              </Button>
            ) : (
              <PaginationNext
                href={`/?page=${page + 1}&limit=${limit}`}
                prefetch={ true }
                onClick={goToNext}
                disabled={isLastPage}
              >

              </PaginationNext>
            ) }




          </PaginationContent>
      </Pagination>
            <CardFooter className='flex flex-col justify-between items-center w-full'>
        <Button asChild>
          <Link
            href={ `/edit/${currentImage.id}` }
          >
            <PencilIcon className='h-8 w-8' />
          </Link>
              </Button>
      </CardFooter>
    </Card>
  )
}

export default ImageCarousel
