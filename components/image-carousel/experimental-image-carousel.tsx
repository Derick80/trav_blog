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
import { getImgProps, getImageBuilder } from './images'
import { H3, Muted, Small } from '../ui/typography'
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
  console.log(page, 'page')

  console.log(images.length, 'images.length')
  console.log(activeIndex, 'activeIndex')

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
  console.log(useDoubleChevronLeft, 'useDoubleChevronLeft')

  // Determine if double chevrons should be used for navigating to the next page
  const useDoubleChevronRight =
    page < totalPageNumber && activeIndex === images.length - 1

  console.log(useDoubleChevronRight, 'useDoubleChevronRight')

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

  // Calculate the current page and total pages
  const currentPage = page

  return (
    <Card

    // removing items-center caused less layout shift
    >
      {/* Display the current image's title */}
      <CardHeader>
        <CardTitle>
          <EditableTextField
            initialValue={currentTitle} // Use image.title for the title field
            onUpdate={(value) => {
              editTitle({ id: currentImageId, title: value })
            }} // Function to update the title state
            //   label="Title" // Add label for title doesn't look good atm
            className='text-lg font-semibold' // Optional styling for title
          />
        </CardTitle>
        <CardDescription>
          <EditableTextField
            initialValue={currentDescription} // Use image.title for the title field
            onUpdate={(value) => {
              editDescription({
                id: currentImageId,
                description: value
              })
            }} // Function to update the title state
            //   label="Title" // Add label for title doesn't look good atm
            className='text-lg font-semibold' // Optional styling for title
          />
        </CardDescription>
      </CardHeader>

      <CardContent className='relative flex h-96 min-h-96 items-center overflow-hidden rounded-lg md:h-[500px] md:overflow-y-auto'>
        {/* <div className="relative flex h-96 items-center min-h-96 overflow-hidden rounded-lg"> */}

        {useDoubleChevronLeft ? (
          <Button
            type='button'
            variant='rounded'
            size='icon'
            className='Z-30 absolute left-7 cursor-pointer items-center  justify-center bg-primary/50 hover:bg-primary/80 focus:outline-none'
            data-carousel-prev
          >
            <Link
              href={`/?page=${page - 1}&limit=${limit}`}
              prefetch={true}
              scroll={false}
              legacyBehavior
              passHref
            >
              <a onClick={() => setActiveIndex(images.length - 1)}>
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
            className='Z-30 absolute  left-7 cursor-pointer items-center  justify-center bg-primary/50 hover:bg-primary/80 focus:outline-none'
            onClick={() => setActiveIndex(activeIndex - 1)}
            disabled={isFirstImage}
            data-carousel-prev
          >
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground  hover:text-secondary'>
              {/* SVG for Previous button */}
              <ChevronLeft />
              <span className='sr-only'>Previous</span>
            </span>
          </Button>
        )}

        {images.map((image, index) => (
          <div
            key={image.id}
            className={`p-0 duration-1000 ease-in-out ${index === activeIndex ? 'block' : 'hidden'} inset-0 items-center justify-between opacity-100 transition-opacity`}
            data-carousel-item
          >
            {
              <img
                title={currentTitle}
                {...getImgProps(
                  getImageBuilder(currentCloudinaryId, currentTitle, {
                    className: 'object-cover w-full h-full md:object-contain'
                  }),
                  {
                    widths: [320, 480, 640, 750, 828, 1125, 1242], // Include wdths for 1x, 2x, and 3x screens
                    sizes: [
                      '(max-width: 640px) 100vw', // 100% of the viewport width on small screens
                      '(max-width: 768px) 100vw', // 50% of the viewport width on medium screens
                      '(max-width: 1024px) 100vw' // 33% of the viewport width on large screens
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
        ))}
        {useDoubleChevronRight ? (
          <Button
            type='button'
            variant='rounded'
            size='icon'
            className='Z-30 absolute  right-7 cursor-pointer items-center  justify-center bg-primary/50 hover:bg-primary/80 focus:outline-none'
            data-carousel-next
          >
            <Link
              href={`/?page=${page + 1}&limit=${limit}`}
              prefetch={true}
              scroll={false}
              legacyBehavior
              passHref
            >
              <a onClick={() => setActiveIndex(0)}>
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
            onClick={() => setActiveIndex((prevIndex) => prevIndex + 1)}
            data-carousel-next
          >
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground hover:text-secondary '>
              {/* SVG for Next button */}
              <ChevronRight />
              <span className='sr-only'>Next</span>
            </span>
          </Button>
        )}
        {/* </div> */}
      </CardContent>

      <CardFooter className='flex w-full flex-col'>
        {/* Description container */}

        {/* Add the page indicator below the image or wherever it fits best in your layout */}
        <Muted className='py-2  text-xs'>
          Page {currentPage} / {totalPageNumber}
        </Muted>
        {/* Place CreateImageLinks here to show circles beneath the image */}
        <CreateImageLinks
          images={images}
          totalImages={images.length}
          currentIndex={activeIndex}
          setCurrentIndex={setActiveIndex}
        />
        <Muted>Total Images: {totalImages}</Muted>

        <Small className='text-right'>City: {currentCity}</Small>
      </CardFooter>
    </Card>
  )
}

export default ImageSlider

type CreateImageLinkProps = {
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
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}
const CreateImageLinks = ({
  images,
  totalImages,
  currentIndex,
  setCurrentIndex
}: CreateImageLinkProps) => {
  console.log(currentIndex, 'currentIndex')

  return (
    <div className='m-1 flex w-full items-center justify-center '>
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
  )
}

// this button below has the css I could use to make the button full height.

// <Button
//             // control opacity of button here
//             type="button"
//             variant="ghost"
//             size="icon"
//             className="absolute right-0 h-full cursor-pointer items-center  justify-center bg-primary/20 hover:bg-primary/40 focus:outline-none"
//             onClick={() => setActiveIndex((prevIndex) => prevIndex + 1)}
//             data-carousel-next
//           >
//             <span className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground hover:text-secondary ">
//               {/* SVG for Next button */}
//               <ChevronRight />
//               <span className="sr-only">Next</span>
//             </span>
//           </Button>
