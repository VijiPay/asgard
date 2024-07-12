export interface IUserProfile {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	type: string;
	status: number;
	countryCode: string;
	apiKey: string | null;
	profile?: {
		role: string;
		nickname: string;
		dateOfBirth: string;
		phoneNumber: string;
		address: string;
		lastLogin: string;
		phoneVerified?: boolean;
		emailVerified?: boolean;
	} | null;
	paymentMethod?: Array<{
		id: number;
		name: string;
		paymentId: string;
		institution: string;
	}>;
	transactionsCount?: number;
	fraudScores?: Array<{
		score: number;
		result: string;
	}>;
}
