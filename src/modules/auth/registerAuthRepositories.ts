import { container } from "tsyringe";

import type { PrismaClient } from "@prisma/client";
import { AuthComponents } from "./constants/AuthComponents";
import type { IAuthRepository } from "./interfaces/IAuthRepository";
import type { IEmailVerificationRepository } from "./interfaces/IEmailVerificationRepository";
import type { IRegisterUserRepository } from "./interfaces/IRegisterUserRepository";
import type { ITokenRepository } from "./interfaces/ITokenRepository";
import { AuthRepository } from "./repositories/AuthRepository";
import { EmailVerificationRepository } from "./repositories/EmailVerificationRepository";
import { RegisterUserRepository } from "./repositories/RegisterUserRepository";
import { TokenRepository } from "./repositories/TokenRepository";

export const registerAuthRepositories = async (dataSource: PrismaClient) => {
	container.register<IAuthRepository>(AuthComponents.AuthRepository, {
		useValue: new AuthRepository(dataSource),
	});

	container.register<IEmailVerificationRepository>(
		AuthComponents.EmailVerificationRepository,
		{
			useValue: new EmailVerificationRepository(dataSource),
		},
	);

	container.register<IRegisterUserRepository>(
		AuthComponents.RegisterUserRepository,
		{
			useValue: new RegisterUserRepository(dataSource),
		},
	);
	container.register<ITokenRepository>(AuthComponents.TokenRepository, {
		useValue: new TokenRepository(dataSource),
	});
};
