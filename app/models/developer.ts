import type { DateTime } from "luxon";
import { BaseModel, column, belongsTo } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import User from "./user.js";

export default class ApiKey extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare key: string;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoUpdate: true })
	declare lastUsed: DateTime;

	@column()
	declare userId: number;

	@belongsTo(() => User)
	declare user: BelongsTo<typeof User>;
}
