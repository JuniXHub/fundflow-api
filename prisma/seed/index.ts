import { PrismaClient } from '@prisma/client'
import { currencyData } from './currency'
import { iconData } from './icon'

const prisma = new PrismaClient()

async function main() {
  // eslint-disable-next-line no-console
  console.log('Start seeding ...')

  currencyData.forEach(async (data) => {
    const currency = await prisma.currency.create({ data })

    // eslint-disable-next-line no-console
    console.log(`Created currency: ${currency.name}`)
  })

  iconData.forEach(async (data) => {
    const icon = await prisma.icon.create({ data })

    // eslint-disable-next-line no-console
    console.log(`Created icon: ${icon.source}`)
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
