import type { UserType } from "@prisma/client";

export interface IAuthenticatedUser {
	id: number;
	type: UserType;
	status: number;
	country: string;
	name: string | null | undefined;
	token?: string;
	refreshToken?: string;
}
