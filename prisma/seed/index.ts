import { PrismaClient } from '@prisma/client'
import { currencyData } from './currency'

const prisma = new PrismaClient()

async function main() {
  // eslint-disable-next-line no-console
  console.log('Start seeding ...')

  currencyData.forEach(async (data) => {
    const currency = await prisma.currency.create({ data })

    // eslint-disable-next-line no-console
    console.log(`Created currency: ${currency.name}`)
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
