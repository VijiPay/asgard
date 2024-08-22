import type { IUserProfile } from "../interface/IUserProfile";

export class UpdateUserDTO {
	email?: string;
	profile?: {
		address?: string | null;
		phoneNumber?: string | null;
		googleId?: string | null;
		facebookId?: string | null;
	};

	constructor(user: Partial<IUserProfile>) {
		this.email = user.email;
		this.profile = user.profile
			? {
					address: user.profile.address,
					phoneNumber: user.profile.phoneNumber,
					googleId: user.profile.googleId,
					facebookId: user.profile.facebookId,
				}
			: undefined;
	}
}
