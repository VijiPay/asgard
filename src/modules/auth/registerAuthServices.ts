import { container } from "tsyringe";
import { AuthComponents } from "./constants/AuthComponents";
import type { ILoginService } from "./interfaces/ILoginService";
import type { IPasswordService } from "./interfaces/IPasswordService";
import type { IRegisterService } from "./interfaces/IRegisterService";
import type { ISendEmailMessage } from "./interfaces/ISendEmailMessage";
import type { ITokenService } from "./interfaces/ITokenService";
import { LoginService } from "./services/LoginService";
import { PasswordService } from "./services/PasswordService";
import { RegisterService } from "./services/RegisterService";
import { SendEmailMessage } from "./services/SendEmailMessage";
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
container.register<ISendEmailMessage>(
	AuthComponents.SendEmailMessage,
	{
		useClass: SendEmailMessage,
	},
);
