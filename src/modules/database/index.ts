import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'

const db = new PrismaClient()
export default db

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 12)
const genId = () => nanoid()

async function main() {
}

main()
  .catch((e) => {
    console.error(e.message)
  })
  .finally(async () => {
    await db.$disconnect()
  })
