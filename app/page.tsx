import { getAllImages, getCurrentUser } from './actions'
import React from 'react'
import { auth, currentUser } from '@clerk/nextjs'
import { useUser } from '@/app/actions'
import ImageSlider from '@/components/image-carousel/experimental-image-carousel'
import BaseImageSlider from '@/components/image-carousel/base-image-carousel'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GridCarousel from '@/components/image-carousel/grid-images'

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
    <div className=''>
      <GridCarousel totalImages={totalImages} page={page} images={images} />
      {userRole?.role === 'admin' ? (
        <ImageSlider
          images={images}
          totalImages={totalImages}
          page={page}
          limit={limit}
        />
      ) : (
        <BaseImageSlider
          images={images}
          totalImages={totalImages}
          page={page}
          limit={limit}
        />
      )}
      <div>
        {/* { images.map((image) => (
          <GridCarousel
            key={ image.id }
            images={ [image] }
          />
        )
        )} */}
      </div>
    </div>
  )
}

export default Home

// const GridCarousel = ({ images }: {
//   images: {
//     id: string
//     cloudinaryPublicId: string
//     imageUrl: string
//     title: string
//     description: string
//     city: string
//     userId: string
//     likes: {
//       userId: string
//       photoId: string
//     }[]
//   }[]

// }) => {
//   const [currentIndex, setCurrentIndex] = React.useState(0);

//   const showNextImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const showPreviousImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };
//   return (
//     <div className="relative w-[300px] h-[225px]">

//       <div className="absolute inset-0">

//       { images.map((image,index) => (
//         <div
//           className="absolute top-0 left-0 w-full h-[225px]"
//           style={ { zIndex: images.length - index } }
//           key={ image.id }>

//           <Image
//             src={ image.imageUrl }
//             alt={ image.title }
//             // width={ 300 }
//             // height={ 225 }
//             fill={ true }
//             className="rounded-md"
//             style={ {
//               zIndex: images.length - index,
//               objectFit: "cover",
//             } } // Ensure proper stacking order

//           />
//         </div>

//       )) }
//       </div>
//       <button
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full z-20"
//         onClick={ showPreviousImage}
//       >
//         <ChevronLeft className="w-6 h-6 text-black" />
//       </button>
//       <button
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full z-20"
//         onClick={ showNextImage }
//       >

//         <ChevronRight className="w-6 h-6 text-black" />
//       </button>

//     </div >
//   )
// }
