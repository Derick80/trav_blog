'use client'
import { Button } from '../ui/button'
import { ArrowBigLeft, ArrowBigRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import {  Caption, Muted, Small } from '../ui/typography'
import { getAllImages } from '@/app/actions'
import { Photos } from '@prisma/client'

type ImageCarouselProps = {
    images: Omit<Photos, 'userId' | 'createdAt' | 'updatedAt'>[];
    onNextPage?: (
        page: number
    ) => void;

};


const ImageCarousel = ({
    images,
}:ImageCarouselProps) => {
const [currentImageId, setCurrentImageId] = React.useState<string>(images[0]?.id);
const currentImage = images.find(image => image.id === currentImageId) ?? images[0];
const [carouselImages, setCarouselImages] = React.useState(images);


    const [idToIndexMap, setIdToIndexMap] = React.useState<Map<string, number>>(new Map());
const [currentPage, setCurrentPage] = React.useState(1);

React.useEffect(() => {
  const map = new Map();
  images.forEach((image, index) => map.set(image.id, index));
  setIdToIndexMap(map);
}, [images]); // Dependency on images so it updates if images change

const goToNext = async () => {
  const currentIndex = idToIndexMap.get(currentImage.id) ?? 0;
  const isLastImage = currentIndex === images.length - 1;

  if (isLastImage) {
      // Load more images
    await loadMoreImages();
  } else {
    // Navigate to the next image
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImageId = images[nextIndex].id;
    setCurrentImageId(nextImageId);
  }
};

const loadMoreImages = async () => {
    const newImages = await getAllImages({
        page: currentPage + 1,
        limit: 10
    });

    setCarouselImages((prevImages) => [...prevImages, ...newImages]);
    setCurrentPage((prevPage) => prevPage + 1);
};



    const goToPrevious = () => {
        setCurrentImageId((prevId) => {
            const currentIndex = idToIndexMap.get(prevId) ?? 0;
            const nextIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            return images[nextIndex].id;
        }
        );
    };


    return (
        <Card >


            <CardHeader>
                <CardTitle>
                    { currentImage.title}
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
                       { currentImage.description}
                </Muted>
                <Small
                    className='text-right'>
                        { currentImage.city }
                        <MapPin className='h-4 w-4 inline-block ml-1' />
                    </Small>
                <Caption>
                   { currentImage.id}
                    </Caption>
                    <Caption>
                        {currentPage}
                    </Caption>
                    </div>

               </CardContent>


            <CardFooter>
                 {/* Previous Button */}
                <Button
                    variant='ghost'

                    onClick={ goToPrevious }>
                <ArrowBigLeft className="h-8 w-8 text-black" />
                </Button>

                <ul
                    className="flex space-x-2">
                    {carouselImages.map((image) => (
                        <li
                            key={image.id}
                            className={`h-4 w-4 rounded-full ${image.id === currentImage.id ? 'bg-black' : 'bg-gray-300'}`}
                        />
                    )) }
                </ul>


  {/* Number Indicator */}
{/* <div className="text-center py-2">
                                    { `${[
    ...Array.from(idToIndexMap.values())
    ].findIndex(index => images[index].id === currentImageId) + 1} of ${images.length}`}
</div> */}
              {/* Next Button */}
                <Button
                    variant='ghost'
                    onClick={ goToNext }>
                <ArrowBigRight className="h-8 w-8 text-black" />
            </Button>
</CardFooter>


        </Card>
    );
}

export default ImageCarousel


