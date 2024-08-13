import type { ForgotPasswordDTO } from "../dtos/ForgotPasswordDTO";
import type { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";
import type { UpdatePasswordDTO } from "../dtos/UpdatePasswordDTO";

export interface IPasswordService {
	forgotPasswordRequest(email: ForgotPasswordDTO): Promise<void>;
	resetPassword(payload: ResetPasswordDTO): Promise<void>;
	updatePassword(data: UpdatePasswordDTO): Promise<void>;
}
