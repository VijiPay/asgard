export interface IUpdateUserRepository {
	disable(userId: number): Promise<void>;
}
