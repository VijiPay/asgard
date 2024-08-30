import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
	protected tableName = "payment_methods";

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments("id");
			table.string("name").notNullable();
			table.string("payment_id").notNullable();
			table.string("institution").notNullable();
			table.integer("user_id").unsigned().notNullable();

			table.timestamp("created_at", { useTz: true });
			table.timestamp("updated_at", { useTz: true });
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
