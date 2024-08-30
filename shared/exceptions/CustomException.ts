export class CustomException extends Error {
	status: number;

	message: string;

	fields?: unknown;

	constructor(message: string, status?: number, fields?: unknown[]) {
		super(message);
		this.status = status || 417;
		this.message = message;
		this.fields = fields;
	}
}
