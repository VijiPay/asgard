import HttpStatus from 'http-status';
import { CustomApiError, NotFoundError } from '../utils/error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const errorHandler = (err: any, res: any) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (err instanceof NotFoundError) {
        console.log('not found');
        return res.status(HttpStatus.NOT_FOUND).json({ error: err.message });
    }

    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2000':
                return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid data provided' });
            case 'P2001':
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'Resource not found' });
            case 'P2002':
                return res.status(HttpStatus.CONFLICT).json({ error: 'Resource already exists' });
            case 'P2003':
            case 'P2025':
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'Resource not found' });
            default:
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'An unexpected error occurred on the server.' });
        }
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'An unexpected error occurred on the server.' });
}

export default errorHandler;
