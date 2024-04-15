import Image from 'next/image'
import React from 'react'

// Define the shape of the props using TypeScript interface
type ImageMasonryProps = {
  images: {
    id: string
    cloudinaryPublicId: string
    imageUrl: string
    title: string
    description: string
    city: string
    userId: string
    likes: {
      userId: string
      photoId: string
    }[]
    likesCount: number
    role: string
  }[]
  totalImages: number
  page: number
  limit: number
}
// The ImageMasonryContainer component
const ImageMasonryContainer = ({ images }: ImageMasonryProps) => {
  return (
    <div className='masonry-grid'>
      {images.map((image) => (
        <div key={image.id} className='masonry-item'>
          {/* Use the Next.js Image component for optimized loading */}
          <Image
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='
            src={image.imageUrl}
            alt={image.title || 'Masonry Image'}
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  )
}

export default ImageMasonryContainer
