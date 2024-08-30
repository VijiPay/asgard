import router from "@adonisjs/core/services/router";
import registerRoutes from "../app/routes/index.js";
const HealthChecksController = () =>
	import("#controllers/health_checks_controller");

router
	.group(() => {
		registerRoutes();
		router.get("/health", [HealthChecksController]);
	})
	.prefix("/ag");

router.get("/", async () => {
	return {
		hello: "hello Asgardian!",
	};
});
