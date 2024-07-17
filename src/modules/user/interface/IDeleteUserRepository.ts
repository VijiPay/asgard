export interface IDeleteUserRepository {
	delete(userId: number): Promise<void>;
	deleteAll(): Promise<void>;
}
