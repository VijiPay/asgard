export interface ICreateUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	type: string;
	status: number;
	countryCode: string;
	profile?: {
		role: string;
	} | null;
}
