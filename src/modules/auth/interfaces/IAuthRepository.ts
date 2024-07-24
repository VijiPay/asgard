export interface IAuthRepository {
		createPasswordResetRequest(
			id: number,
			token: string,
			tokenExpiry: Date,
		): Promise<void>;
	

		updatePassword(id: number, password: string): Promise<void>;

		updatePasswordDirectly(id: number, newPassword: string): Promise<void>;
	}
