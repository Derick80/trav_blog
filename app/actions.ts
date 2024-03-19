'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../lib/prisma'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { auth, currentUser, redirectToSignIn } from '@clerk/nextjs'
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
  const images = await prisma.photos.findMany({
    select: {
      id: true,
      cloudinaryPublicId: true,
      imageUrl: true,
      title: true,
      description: true,
      city: true,
      userId: true,
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
  return { images, totalImages }
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

export async function whoAmI() {
  const session = await getServerSession()
  return session?.user?.name || 'Not signed in'
}

export async function getInitialUser() {
  const { userId }: { userId: string | null } = auth()

  if (!userId) {
    return redirectToSignIn()
  }
  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (userProfile) {
    return userProfile
  }

  const newUser: {
    id: string
    email: string
    userName: string | null
    userImages: {
      id: string
      imageUrl: string
    }[]
  } = await prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      userName: user.username,
      userImages: {
        connect: {
          id: user.id,
          imageUrl: user.imageUrl ?? ''
        }
      }
    },
    select: {
      id: true,
      email: true,
      userName: true,
      userImages: {
        select: {
          id: true,
          imageUrl: true
        }
      }
    }
  })
  return newUser
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
    }
  })
  if (userProfile) {
    return userProfile
  }

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
