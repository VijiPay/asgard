import {
	IsDefined,
	IsNotEmpty,
	IsNumber,
	IsString,
	IsStrongPassword,
	MinLength,
} from "class-validator";
import { MatchPassword } from "../decorators/MatchPassword";

export class ResetPasswordDTO {
	@IsDefined()
	@IsNotEmpty()
	@IsNumber()
	userId: number;

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	token: string;

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minSymbols: 1,
			minUppercase: 1,
		},
		{
			message:
				"The password must contain at least 1 uppercase character, 1 lowercase, 1 number and should be at least 8 characters long.",
		},
	)
	newPassword: string;

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@MatchPassword("newPassword", { message: "Passwords do not match" })
	confirmNewPassword: string;
}
