import { ResponseStatus } from "#interfaces/i_response";

export default class ResponseDTO<T = null> {
	status: ResponseStatus;
	message: string | undefined;
	data: T;

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
