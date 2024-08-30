import type { DateTime } from "luxon";
import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class MarketplaceItem extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare title: string;

	@column()
	declare description: string;

	@column()
	declare price: number;

	@column()
	declare status: string;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;
}
