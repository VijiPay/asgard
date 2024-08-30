/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from "@adonisjs/core/env";

export default await Env.create(new URL("../", import.meta.url), {
	NODE_ENV: Env.schema.enum(["development", "production", "test"] as const),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	HOST: Env.schema.string({ format: "host" }),
	LOG_LEVEL: Env.schema.enum([
		"fatal",
		"error",
		"warn",
		"info",
		"debug",
		"trace",
	]),

	/*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
	DB_HOST: Env.schema.string(),
	DB_PORT: Env.schema.number(),
	DB_USER: Env.schema.string(),
	DB_PASSWORD: Env.schema.string.optional(),
	DB_DATABASE: Env.schema.string(),

	REDIS_HOST: Env.schema.string(),
	REDIS_PORT: Env.schema.number(),
	REDIS_PASSWORD: Env.schema.string.optional(),

	/*
  |----------------------------------------------------------
  | Variables for configuring ally package
  |----------------------------------------------------------
  */
	FACEBOOK_CLIENT_ID: Env.schema.string(),
	FACEBOOK_CLIENT_SECRET: Env.schema.string(),
	GOOGLE_CLIENT_ID: Env.schema.string(),
	GOOGLE_CLIENT_SECRET: Env.schema.string(),
});
