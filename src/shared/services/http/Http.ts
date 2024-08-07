import { singleton } from 'tsyringe';
import type { IHttpClient } from './IHttpClient';

@singleton()
export class Http {
    constructor(private readonly httpClient: IHttpClient) {}

    async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
        return this.httpClient.get<T>(url, headers);
    }

    async post<T>(
        url: string,
        body: unknown,
        headers?: Record<string, string>
    ): Promise<T> {
        return this.httpClient.post<T>(url, body, headers);
    }
}
