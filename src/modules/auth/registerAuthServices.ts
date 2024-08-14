import { container } from "tsyringe";
import { AuthComponents } from "./constants/AuthComponents";
import type { IEmailVerification } from "./interfaces/IEmailVerification";
import type { ILoginService } from "./interfaces/ILoginService";
import type { IPasswordService } from "./interfaces/IPasswordService";
import type { IRegisterService } from "./interfaces/IRegisterService";
import type { ITokenService } from "./interfaces/ITokenService";
import { SendEmailMessage } from "./services/EmailVerification";
import { LoginService } from "./services/LoginService";
import { PasswordService } from "./services/PasswordService";
import { RegisterService } from "./services/RegisterService";
import { TokenService } from "./services/TokenService";

container.register<IRegisterService>(AuthComponents.RegisterService, {
	useClass: RegisterService,
});
container.register<ITokenService>(AuthComponents.TokenService, {
	useClass: TokenService,
});
container.register<IPasswordService>(AuthComponents.PasswordService, {
	useClass: PasswordService,
});
container.register<ILoginService>(AuthComponents.LoginService, {
	useClass: LoginService,
});
container.register<IEmailVerification>(AuthComponents.EmailVerification, {
	useClass: SendEmailMessage,
});
