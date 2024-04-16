import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { imagesToSeed } from './image-seed'

const prisma = new PrismaClient()

async function seed() {
  const email = process.env.SEED_EMAIL as string

  // cleanup the existing database
  await prisma.user.delete({ where: { email: email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  await prisma.photos.deleteMany({}).catch(() => {
    // no worries if it doesn't exist yet
  })

  await prisma.category.deleteMany({}).catch(() => {
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



  // Create categories
  for (let index = 0; index < seedCategories.length; index++) {
    const category = seedCategories[index]
    await prisma.category.create({
      data: {
        title: category.title
      }
    })
  }


  const categories = await prisma.category.findMany()

  if (!categories) {
    throw new Error('No categories found')
  }



function getRandomCategory ({ categories }: {
  categories: {
    id: string
    title: string
  }[]
  } ){
    const randomIndex = Math.floor(Math.random() * categories.length)
    return categories[randomIndex]

}



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
        city: image.city,
        categories: {
          connect: {
            id: getRandomCategory({ categories }).id,
          }

        }
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

const seedCategories = [
  {
    title: 'Food'
  },
  {
    title: 'Temple'
  },
  {
    title: 'Shrine'
  },
  { title: 'Buildings' },
  {
    title: 'Nature'
  },
  {
    title: 'View'
  },
  {
    title: 'Text'
  },
  {
    title: 'People'
  },
  {
    title: 'Other'
  },
  {
    title: 'Art'
  },
  {
    title: 'Accomodation'
  }
]
