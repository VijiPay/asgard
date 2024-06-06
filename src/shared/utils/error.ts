import HttpStatus from 'http-status'

export class CustomApiError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message)
  }
}

export class BadRequestError extends CustomApiError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
  }
}

export class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
}

export class UnauthorizedError extends CustomApiError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED)
  }
}

export class ForbiddenError extends CustomApiError {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN)
  }
}

export class InternalServerError extends CustomApiError {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class ConflictError extends CustomApiError {
    constructor(message: string) {
        super(message, HttpStatus.CONFLICT)
    }
    }