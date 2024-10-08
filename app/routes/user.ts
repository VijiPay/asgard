import router from "@adonisjs/core/services/router";
import { middleware } from "#start/kernel";
const UserController = () => import("#controllers/user_controller");

export default function userRoutes() {
	router
		.group(() => {
			router.post("/create", [UserController, "create"]);

			router
				.group(() => {
					router.get("/:id", [UserController, "getUser"]);
					router.put("/:id", [UserController, "update"]);
					router.delete("/:id", [UserController, "delete"]);
					router.put("/:id/change-password", [
						UserController,
						"changePassword",
					]);
				})
				.use(middleware.auth());
		})
		.prefix("/users");
}
