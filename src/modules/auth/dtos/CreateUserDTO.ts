import {
	IsDefined,
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	MinLength,
} from "class-validator";

export class CreateUserDTO {
	@IsDefined({ message: "First name is required" })
	@IsNotEmpty({ message: "First name is required" })
	@IsString({ message: "First name must be a string" })
	firstName: string;

	@IsDefined({ message: "Last name is required" })
	@IsNotEmpty({ message: "Last name is required" })
	@IsString({ message: "Last name must be a string" })
	lastName: string;

	@IsDefined({ message: "Email is required" })
	@IsNotEmpty({ message: "Email is required" })
	@IsEmail({}, { message: "Email must be a valid email address" })
	email: string;

	@IsDefined({ message: "Password is required" })
	@IsNotEmpty({ message: "Password is required" })
	@IsString({ message: "Password must be a string" })
	@MinLength(8, { message: "Password must be at least 8 characters long" })
	@IsStrongPassword(
		{
			minSymbols: 1,
			minUppercase: 1,
			minLowercase: 1,
		},
		{
			message:
				"The password must contain at least 1 symbol lowercase and uppercase",
		},
	)
	password: string;

	@IsNotEmpty()
	@IsString()
	countryCode: string;
}
