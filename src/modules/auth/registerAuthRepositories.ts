import { container } from "tsyringe";

import type { PrismaClient } from "@prisma/client";
import { AuthComponents } from "./constants/AuthComponents";
import type { IAuthRepository } from "./interfaces/IAuthRepository";
import type { IRegisterRepository } from "./interfaces/IRegisterRepository";
import type { ISendEmailRepository } from "./interfaces/ISendEmailRepository";
import type { ITokenRepository } from "./interfaces/ITokenRepository";
import { AuthRepository } from "./repositories/AuthRepository";
import { RegisterRepository } from "./repositories/RegisterRepository";
import { SendEmailRepository } from "./repositories/SendEmailRepository";
import { TokenRepository } from "./repositories/TokenRepository";

export const registerAuthRepositories = async (dataSource: PrismaClient) => {
	container.register<IAuthRepository>(AuthComponents.AuthRepository, {
		useValue: new AuthRepository(dataSource),
	});

	container.register<ISendEmailRepository>(AuthComponents.SendEmailRepository, {
		useValue: new SendEmailRepository(dataSource),
	});

	container.register<IRegisterRepository>(AuthComponents.RegisterRepository, {
		useValue: new RegisterRepository(dataSource),
	});
	container.register<ITokenRepository>(AuthComponents.TokenRepository, {
		useValue: new TokenRepository(dataSource),
	});
};
