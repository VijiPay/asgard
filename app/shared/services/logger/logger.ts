import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@adonisjs/core/logger";
import env from "#start/env";

// Define log file paths
const errorLogPath = path.join(process.cwd(), "error.log");
const warningLogPath = path.join(process.cwd(), "warning.log");

// Ensure log files exist
fs.appendFileSync(errorLogPath, "", { flag: "a" });
fs.appendFileSync(warningLogPath, "", { flag: "a" });

const loggerConfig = defineConfig({
	default: "app",
	loggers: {
		app: {
			enabled: true,
			name: env.get("APP_NAME"),
			level: env.get("LOG_LEVEL", "info"),
			transport: {
				targets: [
					{
						target: "pino/file",
						options: {
							destination: errorLogPath,
							level: "error",
						},
					},
					{
						target: "pino/file",
						options: {
							destination: warningLogPath,
							level: "warn",
						},
					},
					{
						target: "pino-pretty",
						options: {
							colorize: true,
							translateTime: "SYS:standard",
							ignore: "pid,hostname",
						},
					},
				],
			},
			// Custom log message for console
			hooks: {
				logMethod: (level, message) => {
					console.log(`${level}: handler.unhandled - ${message}`);
				},
			},
		},
	},
});

export default loggerConfig;

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module "@adonisjs/core/types" {
	export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
