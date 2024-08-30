import app from "@adonisjs/core/services/app";
import { type HttpContext, ExceptionHandler } from "@adonisjs/core/http";
import type { Exception } from "@adonisjs/core/exceptions";
import { CustomException } from "#shared/exceptions/CustomException";
import ResponseDTO from "#shared/dtos/response_dto";

export default class HttpExceptionHandler extends ExceptionHandler {
	/**
	 * In debug mode, the exception handler will display verbose errors
	 * with pretty printed stack traces.
	 */
	protected debug = !app.inProduction;

	async handle(error: Exception, ctx: HttpContext) {
		const {
			message = error instanceof CustomException
				? error.message
				: error.message,
			status = error.status,
		} = error;

		const resObj = new ResponseDTO(status, message);
		return ctx.response.status(status).json(resObj);
	}

	/**
	 * The method is used to report error to the logging service or
	 * the third party error monitoring service.
	 *
	 * @note You should not attempt to send a response from this method.
	 */
	async report(error: unknown, ctx: HttpContext) {
		return super.report(error, ctx);
	}
}
