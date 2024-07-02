import { generateId } from './generateID'
import PrismaClientWrapper from './prismaClient'

const db = PrismaClientWrapper

export { generateId }
export default db
