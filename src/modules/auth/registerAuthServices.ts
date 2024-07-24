import { container } from "tsyringe";
import { AuthComponents } from "./constants/AuthComponents";
import { EmailVerificationService } from "./services/EmailVerificationService";
import { LoginService } from "./services/LoginService";
import { PasswordResetService } from "./services/PasswordResetService";
import { RegisterUserService } from "./services/RegisterUserService";
import { TokenService } from "./services/TokenService";

container.register<RegisterUserService>(AuthComponents.RegisterUserService, {
	useClass: RegisterUserService,
});
container.register<TokenService>(AuthComponents.TokenService, {
	useClass: TokenService,
});
container.register<PasswordResetService>(AuthComponents.PasswordResetService, {
	useClass: PasswordResetService,
});
container.register<LoginService>(AuthComponents.LoginService, {
	useClass: LoginService,
});
container.register<EmailVerificationService>(
	AuthComponents.EmailVerificationService,
	{
		useClass: EmailVerificationService,
	},
);
