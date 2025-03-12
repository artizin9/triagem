import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'

async function main() {
  console.log('Starting seeding...')

  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('12345678', 10),
      role: 'PERSONAL',
    },
  })

  console.log('User admin created!')

  console.log('🌱 Database seeded')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
