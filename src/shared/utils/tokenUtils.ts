import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = (length: number) => {
	return customAlphabet(alphabet, length)();
};

export const generateId = (): string => nanoid(12);

export const generateEmailVerificationToken = (): string => {
	return nanoid(15);
};

export const generateLoginToken = (): string => {
	return nanoid(15);
};

export const generatePasswordResetToken = (): string => {
	return nanoid(20);
};

export const generateApiKey = (): string => {
	return customAlphabet(
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		24,
	)();
};

export function expiresInSeconds(seconds: number): Date {
	const date = new Date();
	date.setSeconds(date.getSeconds() + seconds);
	return date;
}

export function expiresInMinutes(minutes: number): Date {
	const date = new Date();
	date.setMinutes(date.getMinutes() + minutes);
	return date;
}

export function expiresInHours(hours: number): Date {
	const date = new Date();
	date.setHours(date.getHours() + hours);
	return date;
}

export function expiresInDays(days: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date;
}

export function expiresInWeeks(weeks: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + weeks * 7);
	return date;
}

export function expiresInMonths(months: number): Date {
	const date = new Date();
	date.setMonth(date.getMonth() + months);
	return date;
}

export function expiresInYears(years: number): Date {
	const date = new Date();
	date.setFullYear(date.getFullYear() + years);
	return date;
}
