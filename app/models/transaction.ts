import type { DateTime } from "luxon";
import { BaseModel, column, belongsTo, hasMany } from "@adonisjs/lucid/orm";
import type { BelongsTo, HasMany } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
import Business from "./business.js";
import Payment from "./payment.js";
import Fraudscore from "./fraudscore.js";

export default class Transaction extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare amount: number;

	@column()
	declare status: string;

	@column()
	declare description: string;

	@column()
	declare initiatorId: number;

	@column()
	declare receiverId: number;

	@column()
	declare businessId: number | null;

	@belongsTo(() => User, { foreignKey: "initiatorId" })
	declare initiator: BelongsTo<typeof User>;

	@belongsTo(() => User, { foreignKey: "receiverId" })
	declare receiver: BelongsTo<typeof User>;

	@belongsTo(() => Business)
	declare business: BelongsTo<typeof Business>;

	@hasMany(() => Payment)
	declare payments: HasMany<typeof Payment>;

	@hasMany(() => Fraudscore)
	declare fraudScores: HasMany<typeof Fraudscore>;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;
}
