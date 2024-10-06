import { IResponse, ResponseStatus } from "#contracts/i_response";

export default class ResponseDTO implements IResponse<unknown> {
	status: ResponseStatus;
	message: string | undefined;
	data: unknown;

	constructor(status: ResponseStatus, message?: string, data: unknown=null) {
		this.status = status;
		this.message = message;
		this.data = data;
	}

	static success(message?: string, data: unknown=null): ResponseDTO {
		return new ResponseDTO(ResponseStatus.SUCCESS, message, data)
	}
}
