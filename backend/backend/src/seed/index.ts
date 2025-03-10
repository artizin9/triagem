import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'

async function main() {
  console.log('Starting seeding...')

  console.log('Reseting database...')
  await prisma.exercicio.deleteMany()
  await prisma.treino.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('1234567', 10),
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
