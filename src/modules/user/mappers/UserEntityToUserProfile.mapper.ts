import type { UserEntity } from "../entities/User.entity";
import type { IUserProfile } from "../interface/IUserProfile";

export function mapUserEntityToUserProfile(
	user: UserEntity | null,
): IUserProfile | null {
	if (!user) {
		return null;
	}
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		phoneNumber: user.phoneNumber,
		type: user.type,
		status: user.status,
		country_code: user.country_code,
	};
}
