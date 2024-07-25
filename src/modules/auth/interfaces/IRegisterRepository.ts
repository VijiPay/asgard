import type { Prisma, User as PrismaUserModel } from "@prisma/client";

export interface IRegisterRepository {
	create: (user: Prisma.UserCreateInput) => Promise<PrismaUserModel>;
}
