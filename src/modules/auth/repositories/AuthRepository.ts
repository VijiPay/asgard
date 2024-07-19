import type { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthRepository } from "../interfaces/IAuthRepository";
import type { IAuthenticatedUser } from "../interfaces/IAuthenticatedUser";

@injectable()
export class AuthRepository implements IAuthRepository {
	private connection: PrismaClient;
	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async login(authDTO: AuthDTO): Promise<IAuthenticatedUser | null> {
		const user = await this.connection.user.findUnique({
			where: { email: authDTO.email },
			include: {
				profile: true,
			},
		});
		if (!user || !bcrypt.compareSync(authDTO.password, user.password)) {
			throw new CustomException("invalid credentials", httpStatus.UNAUTHORIZED);
		}
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			"JWT SECRET FROM ENV",
			{ expiresIn: "3600s" },
		);
		const authenticatedUser: IAuthenticatedUser = {
			id: user.id,
			type: user.type,
			status: user.status,
			country: user.countryCode,
			name: user.profile?.tradeName,
			token,
		};

		return authenticatedUser;
	}

	async refreshToken(token: string): Promise<string> {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const decode: any = jwt.sign(token, "JWTSECRET FROM ENV");
		const user = await this.connection.user.findUnique({
			where: {
				id: decode.id,
			},
		});
		if (!user) {
			throw new CustomException("user.notFound", httpStatus.NOT_FOUND);
		}
		const newToken = jwt.sign(
			{ id: user.id, email: user.email },
			"JWT SECRET FROM ENV",
			{ expiresIn: "1h" },
		);
		return newToken;
	}
}
