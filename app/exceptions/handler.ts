import type { Exception } from "@adonisjs/core/exceptions";
import { ExceptionHandler, type HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";
import ResponseDTO from "#shared/dtos/response_dto";
import { CustomException } from "#shared/exceptions/custom_exception";
import { ResponseStatus } from "../../types/i_response.js";

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

		const resObj = new ResponseDTO(ResponseStatus.ERROR, message);
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
