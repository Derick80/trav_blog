import { getAllCategories, getAllImages, getCategorySummary, getCurrentUser } from './actions'
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
import { UpdateButton } from '@/components/updateButton'

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

  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined

  const { images, totalImages, imagesWithSharedCategories } = await delay(1000).then(() =>
    getAllImages({
      page,
      limit,
      category
    })
  )


  if (images.length === 0) {
    return <div>No images found</div>
  }




  const categories = await getCategorySummary({
    category
  })
  console.log(categories, 'catts');


  function handleCategorySelect (id: string, title: string) {
    const searchParams = new URLSearchParams(window.location.search)
    const category = searchParams.get('category')
    const categories = category ? category.split(',') : []
    const index = categories.indexOf(id)
    if (index > -1) {
      categories.splice(index, 1)
    } else {
      categories.push(id)
    }
    searchParams.set('category', categories.join(','))
    window.location.search = searchParams.toString()


  }


  return (
    <div className='flex flex-col justify-center gap-10'>
      <div
        className='flex flex-wrap gap-2'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='relative z-20 rounded-full bg-primary/70 p-1 hover:bg-primary/30'

        >
          <Small>
            <span className='mr-1'>All</span>
          </Small>
          <span className='absolute bottom-0 translate-x-5 translate-y-1 right-0 rounded-full bg-white px-2 py-1 text-xs text-primary'>
            { totalImages }
          </span>
        </Button>
        {
          categories.map((cat) => (
            <UpdateButton key={ cat.id } title={ cat.title } count={ cat.count }


            />

          ))
        }
        </div>
      <div
      className='flex flex-wrap gap-2'>

      </div>


      <Separator />
      <H2>
        <span className='text-3xl'>Image Gallery</span>
      </H2>

      <ImageGallerySlider
        allCategories={categories}
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


function CategoryButton({ category, selected, onSelect }) {
  return (
    <Button
      variant='rounded'
      size='xs'
      disabled={selected}
      onClick={() => onSelect(category.id, category.title)}
    >
      {category.title}
      {selected && <Filter />}
    </Button>
  )
}

