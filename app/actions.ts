'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../lib/prisma'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs'
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
      userId: true
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
