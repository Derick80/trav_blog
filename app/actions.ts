'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../lib/prisma'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export async function clog(text: string) {
  console.log(text)
}
export async function getAllImages({
  page,
  limit
}: {
  page: number
  limit: number
}) {
  const totalImages = await prisma.photos.count()
  const retrieved = await prisma.photos.findMany({
    select: {
      id: true,
      cloudinaryPublicId: true,
      imageUrl: true,
      title: true,
      description: true,
      city: true,
      userId: true,
      likes: true,
      _count: {
        select: {
          likes: true
        }
      },
      user: {
        select: {
          role: true
        }
      }
    },

    orderBy: {
      createdAt: 'desc'
    },
    skip: (page - 1) * limit,
    take: limit
  })
  const images = retrieved.map((image) => {
    return {
      id: image.id,
      cloudinaryPublicId: image.cloudinaryPublicId,
      imageUrl: image.imageUrl,
      title: image.title,
      description: image.description,
      city: image.city,
      userId: image.userId,
      likes: image.likes
        .map((like) => {
          return {
            photoId: like.photoId,
            userId: like.userId
          }
        })
        .flat(),
      likesCount: image._count.likes,
      role: image.user.role
    }
  })
  return { images, totalImages }
}

export async function hasLikedImage({
  photoId,
  userId
}: {
  photoId: string
  userId: string
}) {
  const like = await prisma.like.findUnique({
    where: {
      photoId_userId: {
        photoId,
        userId
      }
    }
  })
  return like
}

export const getImageById = async (id: string) => {
  const image = await prisma.photos.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      cloudinaryPublicId: true,
      imageUrl: true,
      title: true,
      description: true,
      city: true,
      flagged: true,
      userId: true,
      user: {
        select: {
          role: true
        }
      }
    }
  })

  return image
}

export const deleteImage = async (id: string) => {
  const deleted = await prisma.photos.delete({
    where: {
      id
    }
  })
  if (deleted) {
    revalidatePath('/')
    return deleted
  }
}

export const likeImage = async (photoId: string, userId: string) => {
  const isLiked = await prisma.like.findUnique({
    where: {
      photoId_userId: {
        photoId,
        userId
      }
    }
  })

  if (isLiked) {
    // Like exists, so unlike the photo by deleting the like entry
    await prisma.like.delete({
      where: {
        photoId_userId: {
          photoId,
          userId
        }
      }
    })
    revalidatePath('/')
    return 'removed'
  } else {
    // Like does not exist, so like the photo by creating a new like entry
    await prisma.like.create({
      data: {
        user: {
          connect: { id: userId }
        },
        photo: {
          connect: { id: photoId }
        }
      }
    })
    revalidatePath('/')
    return 'added'
  }
}
export async function editTitle({ id, title }: { id: string; title: string }) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/api/auth/signin')
  }

  const updated = await prisma.photos.update({
    where: {
      id
    },
    data: {
      title
    }
  })
  if (updated) {
    revalidatePath('/posts')
    return updated
  }
}

export async function editDescription({
  id,
  description
}: {
  id: string
  description: string
}) {
  const updated = await prisma.photos.update({
    where: {
      id
    },
    data: {
      description
    }
  })
  if (updated) {
    revalidatePath('/posts')
    return updated
  }
}

export const editCity = async ({ id, city }: { id: string; city: string }) => {
  const updated = await prisma.photos.update({
    where: {
      id
    },
    data: {
      city
    }
  })
  if (updated) {
    revalidatePath('/posts')
    return updated
  }
}
export const useUser = async (userId: string) => {
  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      email: true,
      userName: true,
      role: true,

      password: false
    }
  })
  if (userProfile) return userProfile

  throw new Error('User not found')
}

export const getCurrentUser = async () => {
  const { userId } = auth()
  if (!userId) return null
  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      role: true,
      password: false
    }
  })
  if (userProfile) return userProfile

  throw new Error('User not found')
}

export const getInitUser = async () => {
  const user = await currentUser()
  console.log(user, 'initUser')

  if (!user) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  const userProfile = await prisma.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      id: true,
      email: true,
      userName: true,
      role: true,

      password: false
    }
  })
  if (userProfile) redirect('/')

  const newUser: {
    id: string
    email: string
    userName: string
    role: string
    userImages: {
      id: string
      imageUrl: string
    }[]
  } = await prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      userName: user.username ?? user.firstName ?? '',
      role: 'user',
      userImages: {
        create: {
          id: user.id,
          imageUrl: user.imageUrl ?? ''
        }
      }
    },
    select: {
      id: true,
      email: true,
      userName: true,
      role: true,
      userImages: {
        select: {
          id: true,
          imageUrl: true
        }
      }
    }
  })

  if (newUser) redirect('/')

  throw new Error('User not found')
}
