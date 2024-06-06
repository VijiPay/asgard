import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
export default db

async function main() {
}

main()
  .catch((e) => {
    console.error(e.message)
  })
  .finally(async () => {
    await db.$disconnect()
  })
