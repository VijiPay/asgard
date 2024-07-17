export interface IDeleteUserService {
	delete: (id: number) => Promise<void>;
	deleteAll: () => Promise<void>;
}
