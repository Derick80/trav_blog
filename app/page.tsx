import { getAllImages } from './actions'
import React from 'react'
import { auth, currentUser } from '@clerk/nextjs'
import { useUser } from '@/app/actions'
import ImageSlider from '@/components/image-carousel/experimental-image-carousel'
import BaseImageSlider from '@/components/image-carousel/base-image-carousel'

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
      {/* <BaseImageSlider
        images={images}
        totalImages={totalImages}
        page={page}
        limit={ limit }
      /> */}
    </div>
  )
}

export default Home
