import type { IUserProfile } from "../interface/IUserProfile";

export class UpdateUserDTO {
	email?: string;
	profile?: {
		tradeName?: string | null;
		address?: string | null;
		phoneNumber?: string | null;
	};

	constructor(user: Partial<IUserProfile>) {
		this.email = user.email;
		this.profile = user.profile
			? {
					tradeName: user.profile.tradeName,
					address: user.profile.address,
					phoneNumber: user.profile.phoneNumber,
				}
			: undefined;
	}
}
