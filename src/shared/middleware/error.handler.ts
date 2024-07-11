import { container } from 'tsyringe';
import type { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status';
import { ResponseStatus } from '../interfaces/IResponse';
import { ResponseDTO } from '../dtos/ResponseDTO';
import type { ILogger } from '../services/logger/ILogger';
import { Components } from '../constants/Components';
import { CustomException } from '../exceptions/CustomException';
import type { ICustomException } from '../interfaces/ICustomException';

const logger: ILogger = container.resolve(Components.Logger);
export function errorMiddleware(
    error: ICustomException,
    _: Request,
    response: Response,
    next: NextFunction
) {
    const {
        status = HttpStatus.INTERNAL_SERVER_ERROR,
        fields = {},
        message = error instanceof CustomException
            ? error.message
            : 'Something went wrong'
    } = error;
    const resObj = new ResponseDTO(ResponseStatus.ERROR, message, fields);

    logger.error('handler.unhandled', {
        ...resObj,
        stack: error.stack as unknown,
        fields
    });
    response.status(status).send(resObj);

    next();
}
