import { getAllImages } from './actions'
import React from 'react'
import { H3, Small } from '@/components/ui/typography'
import { auth, currentUser } from '@clerk/nextjs'
import { useUser } from '@/app/actions'
import ImageSlider from '@/components/image-carousel/experimental-image-carousel'

async function Home({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {
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

  // Calculate total number of pages
  const totalPages = Math.ceil(totalImages / limit)

  // Generate pagination links
  const visiblePages = 3 // Number of visible pages
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2))
  const endPage = Math.min(totalPages, startPage + visiblePages - 1)

  return (
    <div className='flex h-full w-full max-w-screen-md flex-col gap-1 py-2 md:gap-5'>
      {/* { me && <div className="absolute top-0 right-0 p-4 bg-white z-10">Welcome {me}</div>
      } */}
      <ImageSlider
        images={images}
        totalImages={totalImages}
        page={page}
        limit={limit}
      />
    </div>
  )
}

export default Home
