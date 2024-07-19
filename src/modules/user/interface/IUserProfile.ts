import type { UserType } from "@prisma/client";

interface IProfile {
	role?: string;
	tradeName?: string;
	phoneNumber: string | null;
	platformId?: string | null;
	address: string | null;
	lastLogin?: Date | null;
	phoneVerified?: boolean;
	emailVerified?: boolean;
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

interface IBusiness {
	name: string;
	address: string;
	registrationNumber: string;
	registrationStatus: string;
	businessPhone: string;
	transactions: number;
	associates: number;
}

export interface IUserProfile {
	id: number;
	firstName: string;
	email: string;
	type: UserType;
	status: number;
	countryCode: string;
	profile: IProfile | null;
	business?: IBusiness;
	paymentMethods?: IPaymentMethod[];
	transactionsCount?: number;
	fraudScore: IFraudScore[];
	createdDate: Date;
}
