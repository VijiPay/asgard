import type { Prisma } from "@prisma/client";

export interface ICreateUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	countryCode: string;
	profile: Prisma.ProfileCreateNestedOneWithoutUserInput;
}
