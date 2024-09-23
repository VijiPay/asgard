import router from "@adonisjs/core/services/router";
import adminRoutes from "#routes/admin";
import authRoutes from "#routes/auth";
import userRoutes from "#routes/user";

export default function registerRoutes() {
	router
		.group(() => {
			adminRoutes();
			userRoutes();
			authRoutes();
		})
		.prefix("/v1");
}
