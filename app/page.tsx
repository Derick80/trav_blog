import {
  getAllCategories,
  getAllImages,
  getCategorySummary,
  getCurrentUser
} from './actions'
import React from 'react'
import ImageGallerySlider from '@/components/image-carousel/grid-images'
import { H2, Muted, Small } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import ImageCarouselFeatures from '@/components/image-carousel/image-slider-about'
import { Badge } from '@/components/ui/badge'
import { Filter } from 'lucide-react'
import FilterByCategory from '@/components/tag-filter'
import { delay } from '@/components/delay'
import { Button } from '@/components/ui/button'
import { Updock } from 'next/font/google'
import { ResetButton, UpdateButton } from '@/components/updateButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

  const category =
    typeof searchParams.category === 'string'
      ? searchParams.category
      : undefined

  const { images, totalImages, imagesWithSharedCategories } =
    await getAllImages({
      page,
      limit,
      category
    })


  if (images.length === 0) {
    return <div>No images found</div>
  }

  const categories = await getCategorySummary({
    category
  })

  return (
    <div className='flex flex-col justify-center gap-10'>
      <div className='flex flex-wrap gap-2'>
        <UpdateButton
          totalImages={totalImages}
          categories={categories}
          searchParams={searchParams}
        />
      </div>

      <Separator />
      <H2>
        <span className='text-3xl'>Image Gallery</span>
      </H2>

      <ImageGallerySlider
        searchParams={searchParams}
        category={category || ''}
        allCategories={categories}
        role={userRole?.role || 'user'}
        totalImages={imagesWithSharedCategories}
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
