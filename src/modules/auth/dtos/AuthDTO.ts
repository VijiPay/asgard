import {
	IsDefined,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from "class-validator";

export class AuthDTO {
	@IsDefined({ message: "Email is required" })
	@IsNotEmpty({ message: "Email is required" })
	@IsEmail({}, { message: "Email must be a valid email address" })
	email: string;

	@IsDefined({ message: "Password is required" })
	@IsNotEmpty({ message: "Password is required" })
	@IsString({ message: "Password must be a string" })
	@MinLength(8, { message: "Password must be at least 8 characters long" })
	password: string;
}
