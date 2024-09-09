import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
	protected tableName = "payments";

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments("id");
			table.float("amount").notNullable();
			table.string("method").notNullable();
			table.string("status").notNullable();
			table.integer("user_id").unsigned().notNullable();
			table.integer("transaction_id").unsigned().nullable();

			table.timestamp("created_at", { useTz: true });
			table.timestamp("updated_at", { useTz: true });
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
