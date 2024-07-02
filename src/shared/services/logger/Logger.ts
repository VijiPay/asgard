import {
  type Logger as WinstonLogger,
  config,
  createLogger,
  format,
  transports,
} from 'winston'
import type { ILogger } from './ILogger'

class Logger implements ILogger {
  private logger: WinstonLogger

  constructor() {
    this.logger = createLogger({
      silent: false,
      levels: config.syslog.levels,
      transports: [
        new transports.Console({
          level: 'error',
          format: format.combine(
            format.json(),
            format.colorize(),
            format.simple(),
          ),
        }),
        new transports.Console({ level: 'info' }),
        new transports.File({
          filename: 'info.log',
          level: 'info',
        }),
        new transports.File({
          filename: 'error.log',
          level: 'error',
        }),
      ],
    })
  }

  info(message: unknown, context?: unknown): void {
    this.logger.info(message)
  }
  error(message: unknown, context?: unknown): void {
    this.logger.error(message)
  }
  warn(message: unknown, context?: unknown): void {
    this.logger.warn(message)
  }
  debug(message: unknown, context?: unknown): void {
    this.logger.debug(message)
  }
  verbose(message: unknown, context?: unknown): void {
    this.logger.verbose(message)
  }
}

export default Logger
