import { BaseModel, column, belongsTo } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import User from "./user.js";

export default class PaymentMethod extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare name: string;

	@column()
	declare paymentId: string;

	@column()
	declare institution: string;

	@column()
	declare userId: number;

	@belongsTo(() => User)
	declare user: BelongsTo<typeof User>;
}
