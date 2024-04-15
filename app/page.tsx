import { getAllImages, getCurrentUser } from './actions'
import React from 'react'
import ImageGallerySlider from '@/components/image-carousel/grid-images'
import { H2 } from '@/components/ui/typography'
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
      <H2>
        <span className='text-3xl'>Image Gallery</span>
      </H2>

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
