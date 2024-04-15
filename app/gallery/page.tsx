/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getAllImages } from '../actions'
import ImageMasonryContainer from '@/components/image-carousel/image-masonry'
import HoverBar from '@/components/hover-bar'
async function GalleryPage({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 20

  const { images, totalImages } = await getAllImages({
    page: page,
    limit: limit
  })
  if (images.length === 0) {
    return <div>No images found</div>
  }

  return (
    <>
      <ImageMasonryContainer
        images={images}
        totalImages={totalImages}
        page={page}
        limit={limit}
      />
      <HoverBar />
    </>
  )
}

export default GalleryPage
