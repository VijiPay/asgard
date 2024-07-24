import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { container } from "tsyringe";
import type { IJwtPayload } from "../interfaces/IJwtPayload";
import { Config } from "../services/config/Config";

const config = container.resolve(Config);

export function generateToken(userId: number, email: string): string {
	return jwt.sign({ id: userId, email }, config.get("JWT_SECRET") as string, {
		expiresIn: process.env.JWT_EXPIRATION,
	});
}

export function decodeToken(token: string) {
	return jwt.verify(
		token,
		config.get<string>("JWT_SECRET") as string,
	) as IJwtPayload;
}

export async function decryptPassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}

export async function encryptPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}
