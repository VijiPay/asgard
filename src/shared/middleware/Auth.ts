// import { Response as ExpressResponse, NextFunction, Request } from "express";
// import HttpStatus from "http-status";
// import jwt from "jsonwebtoken";
// import { container } from "tsyringe";
// import { UserComponents } from "../../modules/user/constants/UserComponents";
// import { UserStatus } from "../../modules/user/constants/UserStatus";
// import { CustomException } from "../exceptions/CustomException";

// interface Decoded {
// 	decoded: {
// 		user_id: number;
// 		exp: number;
// 		accessPermissions: string;
// 	};
// }

// export async function Auth(
// 	request: Request & { user: TokenPayload },
// 	_: Response,
// 	next: NextFunction,
// ) {
// 	const token = request.headers["x-access-token"] as string | undefined;
	

// 	if (!token) {
// 		next(new Error("No token provided"));
// 		return;
// 	}
// 	const payload = jwt.decode(token) as Decoded["decoded"];



// 	next();
// }
