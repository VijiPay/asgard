import type { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";
import type { UpdatePasswordDTO } from "../dtos/UpdatePasswordDTO";

export interface IPasswordService {
	forgotPasswordRequest(email: string): Promise<void>;
	resetPassword(payload: ResetPasswordDTO): Promise<void>;
	updatePassword(data: UpdatePasswordDTO): Promise<void>;
}
