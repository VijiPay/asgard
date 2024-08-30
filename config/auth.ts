import { defineConfig } from "@adonisjs/auth";
import { tokensGuard, tokensUserProvider } from "@adonisjs/auth/access_tokens";
import { sessionGuard, sessionUserProvider } from "@adonisjs/auth/session";
import type { InferAuthEvents, Authenticators } from "@adonisjs/auth/types";

const authConfig = defineConfig({
	default: "api",
	guards: {
		web: sessionGuard({
			useRememberMeTokens: false,
			provider: sessionUserProvider({
				model: () => import("#models/user"),
			}),
		}),
		api: tokensGuard({
			provider: tokensUserProvider({
				tokens: "accessTokens",
				model: () => import("#models/user"),
			}),
		}),
	},
});

export default authConfig;

declare module "@adonisjs/auth/types" {
	interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module "@adonisjs/core/types" {
	interface EventsList extends InferAuthEvents<Authenticators> {}
}
