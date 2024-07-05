import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
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
  password: string;

  @IsDefined({ message: "Phone number is required" })
  @IsNotEmpty({ message: "Phone number is required" })
  @IsString({ message: "Phone number must be a string" })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: "User type is required" })
  @IsString({ message: "User type must be a string" })
  type?: string;
}
