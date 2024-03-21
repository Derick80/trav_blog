import ImageSlider from '@/components/image-carousel/experimental-image-carousel'
import { getAllImages } from '../actions'



export default async function BetaRoute ({ searchParams }:{searchParams: {
    [key: string]: string | string[] | undefined
  }}) {


  const page =    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
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
        <div
            className="flex w-full flex-col border-2 border-yellow-500 gap-5 py-2">
            <ImageSlider images={ images }
                totalImages={ totalImages }
                page={ page }
                limit={ limit }
            />
            </div>
    )
}