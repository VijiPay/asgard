import type { DateTime } from "luxon";
import { BaseModel, column, belongsTo } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import User from "./user.js";

export default class Payout extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare amount: number;

	@column()
	declare status: string;

	@column()
	declare userId: number;

	@belongsTo(() => User)
	declare user: BelongsTo<typeof User>;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;
}
