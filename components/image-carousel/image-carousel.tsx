'use client'
import { Button } from '../ui/button'
import { ArrowBigLeft, ArrowBigRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import {  Caption, Muted, Small } from '../ui/typography'
import { getAllImages } from '@/app/actions'
import { Photos } from '@prisma/client'
import Link from 'next/link'

type ImageCarouselProps = {
    imageArray: Omit<Photos, 'createdAt' | 'updatedAt'>[]
}

const ImageCarousel = (
    { imageArray }: ImageCarouselProps
) => {

    const [images, setImages] = React.useState<Omit<Photos, 'createdAt' | 'updatedAt'>[]>(imageArray)



    return (
        <Card

        >
            <CardContent

            >
                { images.map((image, index) => (

                    <Image
                        className='rounded-lg absolute inset-0'
                    key={index}
                    src={image.imageUrl}
                    alt={image.title}
                        objectFit="cover"
                        width={ 500 }
                        height={ 500 }
                    />
                )) }
            </CardContent>
       </Card>
    );
}


export default ImageCarousel;
