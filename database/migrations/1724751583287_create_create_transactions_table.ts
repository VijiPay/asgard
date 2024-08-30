import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
	protected tableName = "transactions";

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments("id");
			table.float("amount").notNullable();
			table.string("status").notNullable();
			table.string("description").notNullable();
			table.integer("initiator_id").unsigned().notNullable();
			table.integer("receiver_id").unsigned().notNullable();
			table.integer("business_id").unsigned().nullable();

			table.timestamp("created_at", { useTz: true });
			table.timestamp("updated_at", { useTz: true });
		});
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}
