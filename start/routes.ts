import router from "@adonisjs/core/services/router";
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
import registerRoutes from "#routes/index";
import env from "#start/env";

const HealthChecksController = () =>
	import("#controllers/health_checks_controller");

router
	.group(() => {
		registerRoutes();
		router.get("/health", [HealthChecksController, "handle"]);
		router.get("/swagger", async () => {
			return AutoSwagger.default.docs(router.toJSON(), swagger);
		});

		router.get("/api-docs", async () => {
			return AutoSwagger.default.ui("/ag/swagger");
		});
	})
	.prefix("/ag");

router.get("/", async () => {
	return {
		appName: env.get("APP_NAME"),
		environment: env.get("NODE_ENV"),
		message: "goto /ag/api-docs",
	};
});
