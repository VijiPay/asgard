import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDTO {
	@IsDefined()
	@IsNotEmpty()
	@IsEmail({}, { message: "Invalid email address" })
	email: string;
}
