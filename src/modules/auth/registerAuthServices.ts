import { container } from "tsyringe";
import { AuthComponents } from "./constants/AuthComponents";
import { EmailVerificationService } from "./services/EmailVerificationService";
import { LoginService } from "./services/LoginService";
import { PasswordService } from "./services/PasswordService";
import { RegisterService } from "./services/RegisterService";
import { TokenService } from "./services/TokenService";

container.register<RegisterService>(AuthComponents.RegisterService, {
	useClass: RegisterService,
});
container.register<TokenService>(AuthComponents.TokenService, {
	useClass: TokenService,
});
container.register<PasswordService>(AuthComponents.PasswordService, {
	useClass: PasswordService,
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
