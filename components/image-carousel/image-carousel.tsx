'use client'
import { Button } from '../ui/button'
import { ArrowBigLeft, ArrowBigRight, Car, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import {  Caption, Muted, Small } from '../ui/typography'
import { getAllImages } from '@/app/actions'
import { Photos } from '@prisma/client'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ImageCarouselProps = {
    imageArray: Omit<Photos, 'createdAt' | 'updatedAt'>[]
}

const ImageCarousel = (
    { imageArray }: ImageCarouselProps
) => {

    const [images, setImages] = React.useState<Omit<Photos, 'createdAt' | 'updatedAt'>[]>(imageArray)



    return (
        <div
            className="flex flex-col items-center justify-center">

            </div>
    );
}


export default ImageCarousel;




//  <Carousel>
//             <CarouselContent

//             >
//                 { images.map((image, index) => (
//                     <CarouselItem key={ image.id }>
//                         <Image
//                             src={image.imageUrl}
//                             alt={image.title}
//                             width={500}
//                             height={500}
//                         />
//                         </CarouselItem>
//                 )) }
// </CarouselContent>
//         </Carousel>