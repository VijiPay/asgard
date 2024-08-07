import type { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { CustomException } from "../exceptions/CustomException";
import type { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

export function RoleGuard(roles: string[]) {
	return (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
		const { user } = req;
        if(!user){
            throw new CustomException("authentication.required", httpStatus.UNAUTHORIZED)
        }
		const permitted = roles.includes(user.role.toLowerCase());
		if (!permitted) {
			throw new CustomException(
				"You do not have permission to perform this action",
				httpStatus.FORBIDDEN,
			);
		}
		next();
	};
}
