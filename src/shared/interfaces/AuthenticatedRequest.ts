import type { Request } from "express";
import type { TokenPayload } from "./TokenPayload";

export interface AuthenticatedRequest extends Request {
	user: TokenPayload;
}
