'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../lib/prisma'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export async function getAllImages({
  page,
  limit,
  category
}: {
  page: number
    limit: number
  category?: string
  }) {


  const catsToFind = category ? category.split(',') : undefined

  const retrieved = await prisma.photos.findMany({
    where: {
      categories:
        catsToFind
          ? {
              some: {
                title: {
                  in: catsToFind
                }
              }
            }
          : undefined
    },

    select: {
      id: true,
      cloudinaryPublicId: true,
      imageUrl: true,
      title: true,
      description: true,
      city: true,
      userId: true,
      likes: true,
      categories: true,
      _count: {
        select: {
          likes: true,
          categories: {
            where: {
              title: {
                in: catsToFind
              }
}
          }
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
const totalImages = await prisma.photos.count()
  const imagesWithSharedCategories = await prisma.photos.count({
    where: {
      categories:
        catsToFind
          ? {
              some: {
                title: {
                  in: catsToFind
                }
              }
            }
          : undefined
    }
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
      categories: image.categories
        .map((category) => {
          return {
            id: category.id,
            title: category.title
          }
        })
        .flat(),
      likes: image.likes
        .map((like) => {
          return {
            photoId: like.photoId,
            userId: like.userId
          }
        })
        .flat(),
      likesCount: image._count.likes,
      role: image.user.role,
      _count: {
        categories: image._count.categories
      }
    }
  })
  return { images, totalImages ,imagesWithSharedCategories}
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
      id: true,
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

export const getAllUsers = async () => {
  return await prisma.user.findMany({
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
}

export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
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
  if (user) return user

  throw new Error('User not found')
}

export const updateUserRole = async ({
  userId,
  role
}: {
  userId: string
  role: string
}) => {
  const updated = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role
    }
  })
  if (updated) {
    revalidatePath('/admin')
    return updated
  }
}

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          photos: true
        }

      }
    }
  })
}

export const createCategory = async (title: string) => {
  try {
    const category = await prisma.category.create({
      data: {
        title
      }
    })
    if (category) {
      revalidatePath('/')
      return category
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateImageCategories = async ({
  imageId,
  categoryIds
}: {
  imageId: string
  categoryIds: string[]
}) => {
  const updated = await prisma.photos.update({
    where: {
      id: imageId
    },
    data: {
      categories: {
        connect: categoryIds.map((id) => {
          return {
            id
          }
        })
      }
    }
  })
  if (updated) {
    revalidatePath('/')
    return updated
  }
}

export const removeImageCategory = async ({
  imageId,
  categoryId
}: {
  imageId: string
  categoryId: string
}) => {
  const returned = await prisma.photos.update({
    where: {
      id: imageId
    },
    data: {
      categories: {
        disconnect: {
          id: categoryId
        }
      }
    }
  })

  if (returned) {
    revalidatePath('/')
    return returned
  }
}

export const updateImageCategory = async ({
  imageId,
  categoryId,
  title
}: {
  imageId: string
  categoryId: string
  title: string
}) => {
  const photoCategories = await prisma.photos.findUnique({
    where: {
      id: imageId
    },
    select: {
      categories: true
    }
  })

  const alreadyExists = photoCategories?.categories.find(
    (category) => category.id === categoryId
  )

  if (alreadyExists) {
    return removeImageCategory({
      imageId,
      categoryId
    })
  } else {
    return updateImageCategories({
      imageId,
      categoryIds: [categoryId]
    })
  }
}



export const getCategorySummary = async ({
  category
}: {
  category?:string
}) => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          photos: {
            where: {
              categories: {
                some: {
                  title: {
                    contains: category || ''
                  }
                }
              }
            }

          }
        }
      }
    },
    orderBy: {
      title: 'asc'
    }
  })
  return categories.map((cat)=> {
    return {
      id: cat.id,
      title: cat.title,
      count: cat._count.photos
    }



  }
  )
}



