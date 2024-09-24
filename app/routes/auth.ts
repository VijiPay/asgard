import router from "@adonisjs/core/services/router";
import { middleware } from "#start/kernel";

const AuthController = () => import("#controllers/auth_controller");

export default function authRoutes() {
	router
		.group(() => {
			router.post("/login", [AuthController, "login"]);
			router
				.get("/:platform", [AuthController, "platform"])
				.where("platform", /google|facebook/);
			router.get("auth/:platform/callback", async ({ ally, params }) => {
				const platform = ally.use(params.platform);
				if (platform.accessDenied()) {
					return "You have cancelled the login process";
				}
				if (platform.stateMisMatch()) {
					return "We are unable to verify the request. Please try again";
				}
				if (platform.hasError()) {
					return platform.getError();
				}
				const user = await platform.user();
				return user;
			});

			router
				.group(() => {
					router.post("/logout", [AuthController, "logout"]);
				})
				.use(middleware.auth());
		})
		.prefix("/auth");
}
