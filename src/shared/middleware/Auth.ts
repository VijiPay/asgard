import type { NextFunction, Request } from "express";
import httpStatus from "http-status";
import { container } from "tsyringe";
import { UserComponents } from "../../modules/user/constants/UserComponents";
import { UserStatus } from "../../modules/user/constants/UserStatus";
import type { IGetUserService } from "../../modules/user/interface/IGetUserService";
import type { IUser } from "../../modules/user/interface/IUser";
import { CustomException } from "../exceptions/CustomException";
import type { TokenPayload } from "../interfaces/TokenPayload";
import { decodeToken } from "../utils/jwt";

export const Auth = async (
	req: Request & { user: TokenPayload },
	res: Response,
	next: NextFunction,
) => {
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTcyMjI1Nzk2NCwiZXhwIjoxNzIzOTgxMTIxOTczfQ._Cb3TFooLTMVkDwEnlB6-OW0_R-hrUUiCylia_exwAk";
	const userProfileService = container.resolve<IGetUserService>(
		UserComponents.GetUserService,
	);

	if (!token) {
		throw new CustomException("token.required", httpStatus.UNAUTHORIZED);
	}

	const payload = decodeToken(token);
	const user = await userProfileService.findById(payload.id);
	if (user?.status !== UserStatus.ACTIVE.valueOf()) {
		next(
			new CustomException(
				`user found with id: ${payload.id}, ${payload.email} but unauthorized`,
				httpStatus.UNAUTHORIZED,
			),
		);
		return;
	}
	req.user = {
		id: user.id,
		email: user.email,
		role: user.profile?.role as string,
	};
	next();
};

export const redirectAfterAuth = (
	req: Request & { user: IUser },
	res: Response,
	next: NextFunction,
) => {
	const user = req.user as IUser;

	if (user) {
		Response.redirect(`/ag/v1/user/find-by-id?id=${user.id}`, 302);
	} else {
		Response.redirect("/login", 302);
	}
};
