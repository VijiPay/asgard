import type { UserType } from "@prisma/client";

export interface IAuthenticatedUser {
	id: number;
	type: UserType;
	status: number;
	name: string;
	countryCode: string;
	token: string;
}
