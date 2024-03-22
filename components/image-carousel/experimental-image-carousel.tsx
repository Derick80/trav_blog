/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'
import EditableTextField from '../editable-text'
import { editTitle } from '@/app/actions'
import { getImgProps, getImageBuilder } from './images'
import { Muted } from '../ui/typography'
import Link from 'next/link'
import { Button } from '../ui/button'


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
const ImageSlider = ({images,totalImages,page,limit}:ImageSliderProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  console.log(page, 'page');

console.log(images.length, 'images.length');
console.log(activeIndex, 'activeIndex');

  // Calculate the current page and total pages
  const totalPageNumber = Math.ceil(totalImages / limit);
  // Determine if it's the first image of the first page
  const isFirstImage = page === 1 && activeIndex === 0;
  // Determine if it's the last image of the last page
  const isLastImage = page === totalPageNumber && activeIndex === images.length - 1;

  // Determine if double chevrons should be used for navigating to the previous page
  const useDoubleChevronLeft = page > 1 && activeIndex === 0;
  console.log(useDoubleChevronLeft, 'useDoubleChevronLeft');

  // Determine if double chevrons should be used for navigating to the next page
  const useDoubleChevronRight = page < totalPageNumber && activeIndex === images.length - 1;

  console.log(useDoubleChevronRight, 'useDoubleChevronRight');

  // Access the current image's title using activeIndex
const {id:currentImageId, cloudinaryPublicId:currentCloudinaryId, title: currentTitle, description: currentDescription, city: currentCity, userId: currentImageUserId,...otherImageProps } = images[activeIndex];


// Calculate the current page and total pages
  const currentPage = page



    return (
      <div
        className="flex flex-col items-center gap-10 justify-center">
         <div id="gallery" className="relative space-y-1 border-2 border-accent rounded-md"  data-carousel="slide">
{/* Display the current image's title */}

<EditableTextField
  initialValue={currentTitle} // Use image.title for the title field
                onUpdate={ (value) => {
                    editTitle({ id:currentImageId, title: value })

  }} // Function to update the title state
//   label="Title" // Add label for title doesn't look good atm
  className="text-lg font-semibold" // Optional styling for title
/>
      <div className="relative h-72 overflow-hidden rounded-lg md:h-96 bg-card-foreground">
        {images.map((image, index) => (
          <Link
                          href={`/photos/${image.id}`} passHref

            key={image.id}
            className={`p-0 duration-700 ease-in-out ${index === activeIndex ? 'block' : 'hidden'} absolute inset-0 flex items-center justify-center`}
            data-carousel-item
          >
            {
            <img
              title={currentTitle}
              {...getImgProps(
                  getImageBuilder(
                      currentCloudinaryId,
                        currentTitle,
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


          </Link>

        )) }

            </div>
            {/* Chevrons */}

        { useDoubleChevronLeft ? (
          <Button
            type="button"
            variant='rounded'
            size='icon'
            className="absolute top-1/2 left-0 z-30 flex items-center bg-primary/30 justify-center cursor-pointer focus:outline-none"
            data-carousel-prev
            >
            <Link
              href={ `/beta/?page=${page - 1}&limit=${limit}` }
              prefetch={ true }
              scroll={ false }
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
              // control opacity of button here
              type="button"
              variant='rounded'
              size='icon'
        className="absolute top-1/2 left-0 flex items-center justify-center cursor-pointer focus:outline-none bg-primary/30"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-primary-foreground hover:bg-primary-foreground hover:text-primary">
          {/* SVG for Previous button */}
      <ChevronLeft />
          <span className="sr-only">Previous</span>
        </span>
        </Button>
)}
  { useDoubleChevronRight ? (
          <Button
            type="button"
            variant='rounded'
            size='icon'
            className="absolute top-1/2 right-0 z-30 flex items-center bg-primary/30 justify-center cursor-pointer focus:outline-none"
            data-carousel-next
            >
            <Link
              href={ `/beta/?page=${page + 1}&limit=${limit}` }
              prefetch={ true }
              scroll={ false }
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
              // control opacity of button here
              type="button"
              variant='rounded'
              size='icon'
        className="absolute top-1/2 right-0 flex items-center justify-center cursor-pointer focus:outline-none bg-primary/30"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-primary-foreground hover:bg-primary-foreground hover:text-primary">
          {/* SVG for Next button */}
      <ChevronRight />
          <span className="sr-only">Next</span>
        </span>
        </Button>
)}
{/* Description container */}
            <div className=" w-full px-4 py-2 bg-opacity-75 text-center text-sm text-foreground bg-background overflow-hidden" >
              {currentDescription || 'No description available'}
                </div>
               {/* Add the page indicator below the image or wherever it fits best in your layout */}
      <Muted className="text-center text-xs py-2">
        Page {currentPage} / {totalPageNumber}
      </Muted>
             {/* Place CreateImageLinks here to show circles beneath the image */}
      <CreateImageLinks images={images} totalImages={images.length} currentIndex={activeIndex} setCurrentIndex={setActiveIndex} />
        </div>
        </div>
    )

}


export default ImageSlider

const EditableField = ({ value, onChange, ...props }) => {

}

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
    }[],
    totalImages: number
    currentIndex: number
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}
const CreateImageLinks = ({images,totalImages,currentIndex,setCurrentIndex}:CreateImageLinkProps)=>{
console.log(currentIndex, 'currentIndex');


    return (
        <div className="m-1 flex w-full items-center justify-center ">
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
