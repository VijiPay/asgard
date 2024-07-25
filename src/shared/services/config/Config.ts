import { singleton } from "tsyringe";
import type { IConfig } from "./IConfig";

@singleton()
export class Config implements IConfig {
	private readonly config: Record<string, string>;

	constructor() {
		this.config = process.env as Record<string, string>;
	}

	get<T = unknown>(
		propertyPath: string,
		defaultValue?: T | undefined,
	): T | undefined {
		const value = this.config[propertyPath] as T;
		return value || defaultValue;
	}
	defined<T = unknown>(propertyPath: string): T {
		const value = this.config[propertyPath] as T;
		return value;
	}
}
