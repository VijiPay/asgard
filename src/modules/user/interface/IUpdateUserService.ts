import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export interface IUpdateUserService {
	disable: (id: number) => Promise<void>;
	update: (userId: number, payload: UpdateUserDTO) => Promise<void>;
}
