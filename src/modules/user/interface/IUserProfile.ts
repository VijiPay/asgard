export interface IUserProfile {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	type: string;
	status: number;
	countryCode: string;
	profile?: {
		role: string;
		nickname: string | null;
		phoneNumber: string | null;
		address: string | null;
		lastLogin: Date | null;
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
	apiKey?: {
		key: string;
		createdAt: Date;
		lastUsed: Date | null;
	} | null;
}
