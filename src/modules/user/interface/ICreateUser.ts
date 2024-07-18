interface Terms {
	accepted: boolean;
	acceptedOn: Date;
}
export interface ICreateUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	status: number;
	countryCode: string;
	profile?: {
		role: string;
		tosAcceptance: Terms;
	} | null;
}
