import httpStatus from "http-status";

export class CustomException extends Error {
  status: number;

  message: string;

  fields?: unknown;

  constructor(message: string, status?: number, fields?: unknown[]) {
    super(message);
    this.status = status || httpStatus.EXPECTATION_FAILED;
    this.message = message;
    this.fields = fields;
  }
}
