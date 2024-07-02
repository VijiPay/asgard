import type { IConfig } from "./IConfig";

class Config implements IConfig {
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
}
export default Config;
