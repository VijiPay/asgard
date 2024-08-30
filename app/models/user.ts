import { DbAccessTokensProvider } from "@adonisjs/auth/access_tokens";
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";
import { BaseModel, column, hasMany, hasOne } from "@adonisjs/lucid/orm";
import type { HasMany, HasOne } from "@adonisjs/lucid/types/relations";
import type { DateTime } from "luxon";
import type { UserMetadata } from "#interface/i_user_metadata";
import Business from "./business.js";
import BusinessAssociate from "./business_associate.js";
import ApiKey from "./developer.js";
import Fraudscore from "./fraudscore.js";
import Payment from "./payment.js";
import PaymentMethod from "./payment_method.js";
import Payout from "./payout.js";
import Transaction from "./transaction.js";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
	uids: ["email"],
	passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare email: string;

	@column({ serializeAs: null })
	declare password: string | null;

	@column()
	declare firstName: string;

	@column()
	declare lastName: string;

	@column()
	declare type: string;

	@column()
	declare status: number;

	@column()
	declare countryCode: string | null;

	@column()
	declare tradeName: string;

	@column()
	declare address: string | null;

	@column()
	declare role: string;

	@column()
	declare phoneNumber: string | null;

	@column()
	declare phoneVerified: boolean;

	@column()
	declare phoneVerifyCode: string | null;

	@column.dateTime()
	declare phoneVerifyExpires: DateTime | null;

	@column.dateTime()
	declare phoneVerifyDate: DateTime | null;

	@column()
	declare emailVerified: boolean;

	@column()
	declare emailVerifyCode: string | null;

	@column.dateTime()
	declare emailVerifyExpires: DateTime | null;

	@column.dateTime()
	declare emailVerifyDate: DateTime | null;

	@column()
	declare passwordReset: boolean | null;

	@column()
	declare passwordResetToken: string | null;

	@column.dateTime()
	declare passwordResetExpires: DateTime | null;

	@column()
	declare userLocked: boolean;

	@column()
	declare userLockedMessage: string | null;

	@column.dateTime()
	declare userLockedDate: DateTime | null;

	@column()
	declare userLockedBy: string | null;

	@column()
	declare authyId: number | null;

	@column()
	declare platformId: string | null;

	@column()
	declare googleId: string | null;

	@column()
	declare facebookId: string | null;

	@column()
	declare loginIp: string | null;

	@column()
	declare metadata: UserMetadata | null;

	@column.dateTime()
	declare lastLogin: DateTime | null;

	@column()
	declare acceptTerms: boolean;

	@column.dateTime({ autoCreate: true })
	declare createdDate: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare lastModifiedDate: DateTime | null;

	@hasOne(() => ApiKey)
	declare api: HasOne<typeof ApiKey>;

	@hasMany(() => Payment)
	declare payments: HasMany<typeof Payment>;

	@hasMany(() => Fraudscore)
	declare fraudScores: HasMany<typeof Fraudscore>;

	@hasMany(() => Payout)
	declare payouts: HasMany<typeof Payout>;

	@hasMany(() => PaymentMethod)
	declare paymentMethods: HasMany<typeof PaymentMethod>;

	@hasOne(() => Business)
	declare business: HasOne<typeof Business>;

	@hasMany(() => BusinessAssociate)
	declare businessAssociates: HasMany<typeof BusinessAssociate>;

	@hasMany(() => Transaction, { foreignKey: "initiatorId" })
	declare initiatedTransactions: HasMany<typeof Transaction>;

	@hasMany(() => Transaction, { foreignKey: "receiverId" })
	declare receivedTransactions: HasMany<typeof Transaction>;

	@hasOne(() => ApiKey)
	declare apiKey: HasOne<typeof ApiKey>;

	static accessTokens = DbAccessTokensProvider.forModel(User, {
		expiresIn: "7 days",
		prefix: "asg_",
		table: "sessions",
		type: "auth_token",
		tokenSecretLength: 40,
	});
}
