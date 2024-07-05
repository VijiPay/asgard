import { PrismaClient } from "@prisma/client";
import type { IDatabase } from "../shared/interfaces/IDatabase";

export class PrismaClientWrapper extends PrismaClient implements IDatabase {
  async $disconnect(): Promise<void> {
    await this.$disconnect();
  }
}

const prisma = new PrismaClientWrapper();

export default prisma;
