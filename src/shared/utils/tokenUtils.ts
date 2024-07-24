function expiresInSeconds(seconds: number): Date {
	const date = new Date();
	date.setSeconds(date.getSeconds() + seconds);
	return date;
}

function expiresInMinutes(minutes: number): Date {
	const date = new Date();
	date.setMinutes(date.getMinutes() + minutes);
	return date;
}

function expiresInHours(hours: number): Date {
	const date = new Date();
	date.setHours(date.getHours() + hours);
	return date;
}

function expiresInDays(days: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date;
}

function expiresInWeeks(weeks: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + weeks * 7);
	return date;
}

function expiresInMonths(months: number): Date {
	const date = new Date();
	date.setMonth(date.getMonth() + months);
	return date;
}

function expiresInYears(years: number): Date {
	const date = new Date();
	date.setFullYear(date.getFullYear() + years);
	return date;
}

export {
	expiresInSeconds,
	expiresInMinutes,
	expiresInHours,
	expiresInDays,
	expiresInWeeks,
	expiresInMonths,
	expiresInYears,
};
