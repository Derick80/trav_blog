import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { imagesToSeed } from './image-seed'

const prisma = new PrismaClient()

async function seed() {
  const email = (await process.env.SEED_EMAIL) as string

  // cleanup the existing database
  await prisma.user.delete({ where: { email: email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const unhashed_password = (await process.env.UNHASHED_PASSWORD) as string
  const hashedPassword = await bcrypt.hash(unhashed_password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      userName: 'Derick'
    }
  })

  const userId = user.id

  for (let index = 0; index < imagesToSeed.length; index++) {
    const image = imagesToSeed[index]
    console.log(`Image ${index + 1}:`)
    console.log(`Secure URL: ${image.cloudinaryPublicId}`)
    console.log(`Public ID: ${image.cloudinaryPublicId}`)

    // Create entry in the database using Prisma
    await prisma.photos.create({
      data: {
        userId: userId,
        imageUrl: image.imageUrl,
        cloudinaryPublicId: image.cloudinaryPublicId,
        city: image.city
      }
    })
  }
  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
