'use client'
import { Button } from '../ui/button'
import { ArrowBigLeft, ArrowBigRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import {  Caption, H3, Muted, Small } from '../ui/typography'
import EditableTextField from '../editable-text'
import { editTitle, editDescription } from '@/app/actions'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const ImageCarousel = ({ images,totalImages,searchParams,startPage,endPage}: {
    images: {
        id: string,
        imageUrl: string,
        title: string,
        description: string,
        city: string,
        userId: string,

    }[],
    totalImages: number
     searchParams: {
        [key: string]: string | string[] | undefined;
     },
    startPage: number,
    endPage: number,
}) => {
    const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10;
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const [currentIndex, setCurrentIndex] = React.useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : images.length - 1);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    //determine if there is a next image to display

    const hasNext = currentIndex < images.length - 1;

    //determine if there is a previous image to display

    const hasPrevious = currentIndex > 0;

    // if there is no next image to display set search params to the next page of images to display

    if (!hasNext) {

    }
    // Correctly determine the current image to display
    const currentImage = images[currentIndex];
  const paginationLinks = [];

  for (let i = startPage; i <= endPage; i++) {
    paginationLinks.push(
      <PaginationLink
        key={i}
        href={`/?page=${i}&limit=${limit}`}
        isActive={i === page}
      >
        {i}
      </PaginationLink>
    );
  }

    return (
        <Card >


            <CardHeader>
                <CardTitle>
                    <EditableTextField
                            key={currentImage.id}
                        initialValue={ currentImage.title }
                        onUpdate={ (value) => {
                            editTitle({ id: currentImage.id, title: value });

                        }
                    }


                    />
                </CardTitle>
</CardHeader>
            <CardContent >
                 <Image
                    key={currentImage.id}
                    src={currentImage.imageUrl}
                    alt={currentImage.title}
                    width={500} // Set your desired width
                    height={500} // Set your desired height
                />
                <div
                    className='flex flex-col space-y-2'>
                     <Muted
                    className='italic mt-2 indent-2'
                >
                        <EditableTextField initialValue={ currentImage.description }
                            onUpdate={ (value) => {
                                editDescription({ id: currentImage.id, description: value });

                            }
                        }
                        />
                </Muted>
                <Small
                    className='text-right'>
                        { currentImage.city }
                        <MapPin className='h-4 w-4 inline-block ml-1' />
                    </Small>
                <Caption>
                   { currentImage.id}
                </Caption>
                    </div>

               </CardContent>


            <CardFooter

className='flex flex-col justify-between items-center w-full'
            >
                   <div className='flex items-center justify-center'>
                    {/* Render circles for each image */}
    {images.map((_, index) => (
      <div
        key={index}
            className={ `h-4 w-4 rounded-full mx-1 ${currentIndex === index ? 'bg-black' : 'bg-gray-300'}` }
                                onClick={() => setCurrentIndex(index)} // Navigate to the corresponding image

      />
    ))}
               </div>
                <Pagination>

          <PaginationContent>

            <PaginationPrevious
                            href={ `/?page=${page - 1}&limit=${limit}` }
                                                                    prefetch={ true }

            >
              Previous
            </PaginationPrevious>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {paginationLinks}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
                        {
                            hasNext ? (

  <Button className="z-10 mr-4" onClick={goToNext}>
                <ArrowBigRight className="h-8 w-8 " />
                                </Button>) : (


                                    <PaginationNext
                                                href={ `/?page=${page + 1}&limit=${limit}` }
                                        onClick={ goToNext }
                                        prefetch={ true }
                                    >
                                        <ArrowBigRight className='h-8 w-8' />
                                        </PaginationNext>

            )
           }
          </PaginationContent>
        </Pagination>

</CardFooter>


        </Card>
    );
}

export default ImageCarousel
