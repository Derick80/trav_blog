import { getAllImages, getCurrentUser } from './actions'
import React from 'react'
import { auth, currentUser } from '@clerk/nextjs'
import { useUser } from '@/app/actions'
import ImageSlider from '@/components/image-carousel/experimental-image-carousel'
import BaseImageSlider from '@/components/image-carousel/base-image-carousel'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageGallerySlider from '@/components/image-carousel/grid-images'
import { H2, H3 } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import ImageCarouselFeatures from '@/components/image-carousel/image-slider-about'

async function Home({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {
  const userRole = await getCurrentUser()
  console.log(userRole, 'userRole')

  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10

  const { images, totalImages } = await getAllImages({
    page: page,
    limit: limit
  })
  if (images.length === 0) {
    return <div>No images found</div>
  }

  return (
    <div className='flex flex-col justify-center gap-10'>
      <H2>Image Carousel</H2>

      <ImageGallerySlider
        role={userRole?.role || 'user'}
        totalImages={totalImages}
        page={page}
        images={images}
      />

      <div>
        <Separator />
        <ImageCarouselFeatures />
      </div>
    </div>
  )
}

export default Home
