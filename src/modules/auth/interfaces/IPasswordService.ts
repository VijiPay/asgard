export interface IPasswordService {
	forgotPasswordRequest(email: string): Promise<void>;
	resetPassword(
		userId: number,
		token: string,
		newPassword: string,
		confirmNewPassword: string,
	): Promise<void>;
	updatePassword(
		id: number,
		oldPassword: string,
		newPassword: string,
		confirmNewPassword: string,
	): Promise<void>;
}
