import axios, { type AxiosResponse } from 'axios';
import type { IHttpClient } from './IHttpClient';

export class AxiosProvider implements IHttpClient {
    public async get<T>(
        url: string,
        headers?: Record<string, string>
    ): Promise<T> {
        const response: AxiosResponse<T> = await axios.get(url, { headers });
        return response.data;
    }

    public async post<T>(
        url: string,
        body: Record<string, unknown>,
        headers?: Record<string, string>
    ): Promise<T> {
        const response: AxiosResponse<T> = await axios.post<T>(url, body, {
            headers
        });
        return response.data;
    }
}
