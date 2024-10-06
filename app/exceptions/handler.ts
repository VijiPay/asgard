import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { ICustomException } from '#contracts/ICustomException';
import httpStatus from 'http-status';
import { CustomException } from './custom_exception.js';
import ResponseDTO from '#shared/dtos/response_dto';
import { ResponseStatus } from '#contracts/i_response';
import logger from '@adonisjs/core/services/logger'


export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: ICustomException, ctx: HttpContext) {
    // return super.handle(error, ctx)
    const {
      status = httpStatus.INTERNAL_SERVER_ERROR,
      fields ={},
      message = error instanceof CustomException ? error.message : 'Something went wrong'
    } = error;
    const resObj = new ResponseDTO(ResponseStatus.ERROR, message, fields)
    logger.error('handler.handled', {
      ...resObj,
      stack: (error as Error).stack as unknown,
      fields
    })
    ctx.response.status(status).send(resObj);
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
