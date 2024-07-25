import type { CreateUserDTO } from "../dtos/CreateUserDTO";

export interface IRegisterService {
	register: (data: CreateUserDTO) => Promise<{ name: string; email: string }>;
}
