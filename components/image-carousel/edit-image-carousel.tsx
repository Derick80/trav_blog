/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { MapPin } from 'lucide-react'
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
import { editTitle, editDescription, editCity } from '@/app/actions'
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
import { useAuth } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

const ImageCarousel = ({
  images,
  totalImages,
  searchParams,
  startPage,
  endPage,
}: {
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
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  startPage: number
    endPage: number
}) => {
  const { userId,orgRole } = useAuth()

  const isOwner = userId === images[0].userId

  console.log(isOwner, orgRole, 'isOwner, isAdmin');

  const limit =
    typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const [currentImage, setCurrentImage] = React.useState(images[0])
  React.useEffect(() => {
    setCurrentImage(images[currentIndex])
  }, [currentIndex, images])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const isFirstPage = page === 1
  const isFirstImage = currentIndex === 0
  //determine if there is a next image to display

  const hasNext = currentIndex < images.length - 1

  //determine if there is a previous image to display

  const hasPrevious = currentIndex > 0

  const isLastPage = page === endPage

  const isLastImage = currentIndex === images.length - 1
interface PaginationLinkProps {
  key: number; // Key is generally expected to be a number or string
  href: string;
  isActive: boolean;
  children: React.ReactNode; // For the page number displayed
}
  const paginationLinks = [] as React.ReactNode[]

  for (let i = startPage; i <= endPage; i++) {
    paginationLinks.push(
      <PaginationLink
        key={i}
        href={`/?page=${i}&limit=${limit}`}
        isActive={i === page}
      >
        { i }

      </PaginationLink>
    )
  }

  return (
    <Card className="overflow-hidden p-2 ">
      <CardHeader>
        <CardTitle>
          {isOwner  ? (
            <EditableTextField
              initialValue={currentImage.title}
              onUpdate={(value) => {
                editTitle({ id: currentImage.id, title: value })
              }}
            />
          ) : (
            <div className="h-10 w-full cursor-text border-b border-gray-500 focus:border-blue-500">
              {currentImage.title}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 items-center overflow-y-scroll border-2 border-purple-500">
          {
            <img
              title={currentImage.cloudinaryPublicId}
              {...getImgProps(
                getImageBuilder(
                  currentImage.cloudinaryPublicId,
                  currentImage.title,
                  {
                    className: 'object-cover w-full h-full'
                  }
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

        <div className="flex flex-col space-y-1.5 p-6">
          <Muted className="mt-2 indent-2 italic">
            {isOwner  ? (
              <EditableTextField
                initialValue={currentImage.description}
                onUpdate={(value) => {
                  editDescription({ id: currentImage.id, description: value })
                }}
              />
            ) : (
              <div className="flex">
                <div className="h-10 w-full cursor-text border-b border-gray-500 focus:border-blue-500">
                  {currentImage.description}
                </div>
              </div>
            )}
          </Muted>
          {isOwner  ? (
            <div className="inline-flex w-full items-center justify-end">
              <EditableTextField
                initialValue={currentImage.city}
                onUpdate={(value) => {
                  editCity({ id: currentImage.id, city: value })
                }}
                className="border-none "
              >
                <MapPin className="ml-1 " />
              </EditableTextField>
            </div>
          ) : (
            <div className="flex w-full">
              <div className="h-10 w-full cursor-text border-b border-gray-500 focus:border-blue-500">
                {currentImage.city}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      {/* I might be able to extract this out to make it cleaner */}
      <div className="m-1 flex w-full items-center justify-center border-2">
        {/* Render circles for each image */}
        {images.map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-4 w-4 rounded-full ${
              currentIndex === index ? 'bg-black' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)} // Navigate to the corresponding image
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {hasPrevious ? (
            <PaginationPrevious
              href="#"
              onClick={ goToPrevious }
                              scroll={false}

              disabled={isFirstImage}
              className={cn(
                isFirstImage ? 'bg-primary-foreground opacity-30' : '',
                'h-9 w-9 p-0'
              )}
            ></PaginationPrevious>
          ) : (
            <PaginationPrevious
              href={`/?page=${page - 1}&limit=${limit}`}
                onClick={ goToPrevious }
                scroll={false}
              prefetch={true}
                disabled={ isFirstPage }

              className={cn(
                isFirstPage ? 'bg-primary-foreground opacity-30' : '',
                'h-9 w-9 p-0'
              )}
            ></PaginationPrevious>
          )}

          {page > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {paginationLinks}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {hasNext ? (
            <PaginationNext
              href="#"
              onClick={ goToNext }
                              scroll={false}

              disabled={isLastImage}
              className={cn(
                isLastImage ? 'bg-primary-foreground opacity-30' : '',
                'h-9 w-9 p-0'
              )}
            ></PaginationNext>
          ) : (
            <PaginationNext
              href={`/?page=${page + 1}&limit=${limit}`}
                prefetch={ true }
                                scroll={false}

              onClick={goToNext}
              disabled={isLastPage}
              className={cn(
                isLastPage ? 'bg-primary-foreground opacity-30' : '',
                'h-9 w-9 p-0'
              )}
            ></PaginationNext>
          )}
        </PaginationContent>
      </Pagination>
      <CardFooter className="flex w-full flex-col items-center justify-between"></CardFooter>
    </Card>
  )
}

export default ImageCarousel
