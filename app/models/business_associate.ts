import { BaseModel, column, belongsTo } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
import Business from "./business.js";

export default class BusinessAssociate extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare userId: number;

	@column()
	declare businessId: number;

	@column()
	declare role: string;

	@belongsTo(() => User)
	declare user: BelongsTo<typeof User>;

	@belongsTo(() => Business)
	declare business: BelongsTo<typeof Business>;
}
