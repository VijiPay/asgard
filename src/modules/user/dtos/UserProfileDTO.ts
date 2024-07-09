import type { IUserProfile } from "../interface/IUserProfile";

export class UserProfileDTO {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	type: string;
	status: number;
	country_code: string;

	constructor(user: IUserProfile) {
		this.id = user.id;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
		this.phoneNumber = user.phoneNumber;
		this.type = user.type;
		this.status = user.status;
		this.country_code = user.country_code;
	}
}
