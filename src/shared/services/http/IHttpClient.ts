export interface IHttpClient {
    get<T>(url: string, headers?: Record<string, string>): Promise<T>;
    post<T>(
        url: string,
        body: unknown,
        headers?: Record<string, string>
    ): Promise<T>;
}
