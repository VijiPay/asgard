import type { UserType } from "@prisma/client";

interface IProfile {
	role: string;
	nickname: string | null;
	phoneNumber: string | null;
	address: string | null;
	lastLogin: Date | null;
	phoneVerified: boolean;
	emailVerified: boolean;
}

interface IPaymentMethod {
	id: number;
	name: string;
	paymentId: string;
	institution: string;
}

interface IFraudScore {
	score: number;
	result: string;
}

export interface IUserProfile {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	type: UserType;
	status: number;
	countryCode: string;
	profile: IProfile | null;
	paymentMethod?: IPaymentMethod[];
	transactionsCount?: number;
	fraudScore: IFraudScore[];
}
