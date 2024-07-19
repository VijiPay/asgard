import type { IUserProfile } from "../interface/IUserProfile";

export class UpdateUserDTO {
	email?: string;
	profile?: {
		address?: string | null;
		phoneNumber?: string | null;
	};

	constructor(user: Partial<IUserProfile>) {
		this.email = user.email;
		this.profile = user.profile
			? {
					address: user.profile.address,
					phoneNumber: user.profile.phoneNumber,
				}
			: undefined;
	}
}
