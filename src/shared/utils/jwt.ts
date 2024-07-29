import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { container } from "tsyringe";
import type { IJwtPayload } from "../interfaces/IJwtPayload";
import { Config } from "../services/config/Config";
import { expiresInDays, expiresInMinutes } from "./tokenUtils";

const config = container.resolve(Config);

export function generateToken(userId: number, email: string): string {
	return jwt.sign({ id: userId, email }, config.get("SECRET") as string, {
		expiresIn: process.env.JWT_EXPIRATION,
	});
}

export function generateAccessToken(userId: number, email: string): string {
	return jwt.sign({ id: userId, email }, config.defined<string>("SECRET"), {
		expiresIn: expiresInMinutes(15).getTime(),
	});
}

export function generateRefreshToken(userId: number): string {
	return jwt.sign({ id: userId }, config.defined<string>("SECRET"), {
		expiresIn: expiresInDays(1).getTime(),
	});
}

export function decodeToken(token: string) {
	return jwt.verify(
		token,
		config.get<string>("SECRET") as string,
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
