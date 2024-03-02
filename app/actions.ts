'use server'

import prisma from '../lib/prisma'

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
  return await prisma.photos.update({
    where: {
      id
    },
    data: {
      title
    }
  })
}

export async function editDescription({
  id,
  description
}: {
  id: string
  description: string
}) {
  return await prisma.photos.update({
    where: {
      id
    },
    data: {
      description
    }
  })
}
