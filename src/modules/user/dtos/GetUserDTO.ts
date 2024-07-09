import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from "class-validator";

export class GetUserDTO {
  @IsOptional()
  @IsDefined({ message: "Email is required" })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email?: string;

  @IsOptional()
  @IsDefined({ message: "User Id is not defined" })
  @IsNotEmpty({ message: "User Id is required" })
  @IsInt({ message: "Id must be a number" })
  @Min(1, { message: "Id must be greater than 0" })
  id?: number;
}
