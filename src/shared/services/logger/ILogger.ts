export interface ILogger {
  info(message: unknown, context?: unknown): unknown
  error(message: unknown, context?: unknown): unknown
  warn(message: unknown, context?: unknown): unknown
  debug(message: unknown, context?: unknown): unknown
  verbose(message: unknown, context?: unknown): unknown
}
