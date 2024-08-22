import type { Prisma } from "@prisma/client";

export interface ICreateUser {
	email: string;
	password: string | null;
	firstName: string;
	lastName: string;
	countryCode: string | null;
	profile: Prisma.ProfileCreateNestedOneWithoutUserInput;
}
