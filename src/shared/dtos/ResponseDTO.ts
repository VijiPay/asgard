import { type IResponse, ResponseStatus } from "../interfaces/IResponse";

export class ResponseDTO<T> implements IResponse<T> {
  data: T;
  message: string | undefined;
  status: ResponseStatus;

  constructor(status: ResponseStatus, message?: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = (data || null) as T;
  }

  static success<T>({
    message,
    data,
  }: { message?: string; data?: T } = {}): ResponseDTO<T> {
    return new ResponseDTO(ResponseStatus.SUCCESS, message, data);
  }
}
