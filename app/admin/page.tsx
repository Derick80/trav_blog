import React from 'react'
import ImageGallerySlider from '@/components/image-carousel/grid-images'
import { H2 } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import ImageCarouselFeatures from '@/components/image-carousel/image-slider-about'
import { getAllUsers, getCurrentUser, getUserData } from '../actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

async function Home({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {
  const userRole = await getCurrentUser()

  if (userRole === null || userRole.role !== 'admin') return
  ;<H2>You are not authorized to view this page</H2>

  const users = await getAllUsers()
  if (users.length === 0) {
    return <div>No users found</div>
  }
  console.log(users, 'users')

  return (
    <div className='relative '>
      {users.map((user) => (
        <Card key={user.id} className='flex flex-col gap-2 p-2'>
          <CardHeader>
            <CardTitle>{user.userName}</CardTitle>
          </CardHeader>
          <CardContent>
            {user.email}
            {user.role}
            {user.userImages.map((image, index) => (
              <Image
                key={index}
                src={image.imageUrl}
                alt={image.id}
                width={100}
                height={100}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Home
