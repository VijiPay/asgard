import type { UserType } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";

interface IPartialTransaction {
	id: number;
}

export interface IUser {
	id: number;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	type: UserType;
	status: number;
	countryCode: string;
	createdDate: Date;
	lastModifiedDate: Date;
	profile: IProfile | null;
	payments?: IPayment[] | null;
	fraudScore?: IFraudScore[] | null;
	payouts?: IPayout[] | null;
	paymentMethods?: IPaymentMethod[] | null;
	business?: IBusiness | null;
	businessAssociates?: IBusinessAssociate[] | null;
	initiatedTransactions?: IPartialTransaction[];
	receivedTransactions?: IPartialTransaction[];
}

export interface IProfile {
	id: number;
	tradeName: string;
	address: string | null;
	phoneNumber: string | null;
	role: string;
	loginIp: string | null;
	platformId: string | null;
	lastLogin: Date | null;
	passwordReset: boolean | null;
	passwordResetToken: string | null;
	phoneVerified: boolean;
	emailVerified: boolean;
	passwordResetExpires: Date | null;
	userLocked: boolean | null;
	userLockedMessage: string | null;
	userLockedDate: Date | null;
	userLockedBy: string | null;
	authyId: number | null;
	phoneVerifyCode: string | null;
	phoneVerifyExpires: Date | null;
	phoneVerifyDate: Date | null;
	emailVerifyCode: string | null;
	emailVerifyExpires: Date | null;
	emailVerifyDate: Date | null;
	metadata: JsonValue;
	acceptTerms: boolean;
	userId: number;
}
export interface ITransaction {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	amount: number;
	status: string;
	description: string;
	initiatorId: number;
	receiverId: number;
	businessId?: number | null;
	payments?: IPayment[];
	fraudScore?: IFraudScore[];
	initiator?: IUser;
	receiver?: IUser;
	business?: IBusiness;
}

export interface IPayment {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	amount: number;
	method: string;
	status: string;
	userId: number;
	transactionId: number;
}

export interface IFraudScore {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	score: number;
	result: string;
	userId: number;
	transactionId: number | null;
}

export interface IPayout {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	amount: number;
	status: string;
	userId: number;
}

export interface IPaymentMethod {
	id: number;
	name: string;
	paymentId: string;
	institution: string;
	userId: number;
}

export interface IBusiness {
	id: number;
	name: string;
	address: string;
	registrationNumber: string;
	registrationStatus: string;
	phoneNumber: string;
	userId: number;
	linkedUsers: IBusinessAssociate[] | null;
	transactions: ITransaction[] | null;
}

export interface IBusinessAssociate {
	id: number;
	userId: number;
	businessId: number;
	role: string;
	user: IUser | null;
	business: IBusiness | null;
}
