import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
	protected tableName = "api_keys";

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments("id");
			table.string("key").notNullable();
			table.integer("user_id").unsigned().notNullable();

			table.timestamp("created_at", { useTz: true });
			table.timestamp("last_used", { useTz: true });
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
