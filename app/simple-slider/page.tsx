/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  getImageBuilder,
  getImgProps
} from '@/components/image-carousel/images'
import { getAllImages } from '../actions'
import { Button } from '@/components/ui/button'

export async function SimpleSliderRoute({
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
    <div className='relative h-full w-full '>
      <div className='flex h-full w-full overflow-hidden'>
        {images.map((image, index) => (
          <img
            key={index}
            title={image.title}
            {...getImgProps(
              getImageBuilder(image.cloudinaryPublicId, image.title, {
                className: 'object-cover w-full h-full shrink-0 grow-0 block'
              }),
              {
                widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
                sizes: [
                  '(max-width:1023px) 80vw',
                  '(min-width:1024px) and (max-width:1620px) 67vw',
                  '1100px'
                ],
                transformations: {
                  quality: 'auto',
                  format: 'webp'
                }
              }
            )}
          />
        ))}
      </div>
      <Button className='absolute bottom-0 left-0 top-0 block cursor-pointer  p-4 hover:bg-black/25'>
        Previous
      </Button>
      <button className='absolute bottom-0 right-0 top-0 block cursor-pointer  p-4 hover:bg-black/25'>
        Next
      </button>
    </div>
  )
}

export default SimpleSliderRoute
