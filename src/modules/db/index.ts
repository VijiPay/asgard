import { PrismaClient } from '@prisma/client';
import { customAlphabet } from 'nanoid';

const db = new PrismaClient();
export default db;

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 12);
export const genId = () => nanoid();
