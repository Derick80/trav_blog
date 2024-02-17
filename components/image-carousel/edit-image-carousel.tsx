'use client'
import { Button } from '../ui/button'
import { ArrowBigLeft, ArrowBigRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import {  Caption, Muted, Small } from '../ui/typography'
import EditableTextField from '../editable-text'
import { editTitle, editDescription } from '@/app/actions'


const ImageCarousel = ({ images }: {
    images: {
        id: string,
        imageUrl: string,
        title: string,
        description: string,
        city: string,
        userId: string,

    }[]
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : images.length - 1);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Correctly determine the current image to display
    const currentImage = images[currentIndex];

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


            <CardFooter>
                 {/* Previous Button */}
            <Button className="absolute left-0 z-10 ml-4" onClick={goToPrevious}>
                <ArrowBigLeft className="h-8 w-8 text-black" />
            </Button>
              {/* Next Button */}
            <Button className="absolute right-0 z-10 mr-4" onClick={goToNext}>
                <ArrowBigRight className="h-8 w-8 text-black" />
            </Button>
</CardFooter>


        </Card>
    );
}

export default ImageCarousel
