import type { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";

export interface IPasswordService {
	forgotPasswordRequest(email: string): Promise<string>;
	resetPassword(payload: ResetPasswordDTO): Promise<void>;
	updatePassword(
		id: number,
		oldPassword: string,
		newPassword: string,
		confirmNewPassword: string,
	): Promise<void>;
}
