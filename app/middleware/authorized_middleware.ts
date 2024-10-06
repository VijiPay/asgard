
import { CustomException } from "#exceptions/custom_exception";
import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class AuthorizedMiddleware {
	async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
		const user = await ctx.auth.authenticate();
		if (!allowedRoles.includes(user.role)) {
			throw new CustomException("Insufficient Permission", 403);
		}
		const output = await next();
		return output;
	}
}
