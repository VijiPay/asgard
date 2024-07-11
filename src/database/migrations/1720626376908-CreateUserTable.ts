import { type MigrationInterface, type QueryRunner, Table } from "typeorm";

export class CreateUserTable1720626376908 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "email",
						type: "varchar",
						length: "255",
						isUnique: true,
						isNullable: false,
					},
					{
						name: "password",
						type: "varchar",
						length: "255",
						isNullable: false,
					},
					{
						name: "firstName",
						type: "varchar",
						length: "255",
						isNullable: false,
					},
					{
						name: "lastName",
						type: "varchar",
						length: "255",
						isNullable: false,
					},
					{
						name: "type",
						type: "varchar",
						length: "50",
						isNullable: true,
					},
					{
						name: "nickname",
						type: "varchar",
						length: "255",
						isNullable: true,
					},
					{
						name: "phone_number",
						type: "varchar",
						length: "50",
						isNullable: true,
					},
					{
						name: "date_of_birth",
						type: "varchar",
						length: "50",
						isNullable: true,
					},
					{
						name: "role",
						type: "varchar",
						length: "50",
						isNullable: true,
					},
					{
						name: "status",
						type: "int",
						default: 1,
						isNullable: true,
					},
					{
						name: "login_ip",
						type: "varchar",
						length: "50",
						isNullable: true,
					},
					{
						name: "platform_id",
						type: "varchar",
						length: "50",
						isNullable: true,
					},
					{
						name: "last_login",
						type: "datetime",
						isNullable: true,
					},
					{
						name: "password_reset",
						type: "boolean",
						isNullable: true,
					},
					{
						name: "password_reset_token",
						type: "varchar",
						length: "255",
						isNullable: true,
					},
					{
						name: "password_reset_expires",
						type: "datetime",
						isNullable: true,
					},
					{
						name: "user_locked",
						type: "boolean",
						isNullable: true,
					},
					{
						name: "user_locked_message",
						type: "varchar",
						length: "255",
						isNullable: true,
					},
					{
						name: "user_locked_date",
						type: "datetime",
						isNullable: true,
					},
					{
						name: "user_locked_by",
						type: "varchar",
						length: "255",
						isNullable: true,
					},
					{
						name: "api_key",
						type: "varchar",
						length: "255",
						isNullable: true,
					},
					{ name: "authy_id", type: "int", isNullable: true },
					{
						name: "phone_verified",
						type: "boolean",
						isNullable: true,
					},
					{
						name: "phone_verify_code",
						type: "varchar",
						length: "255",
						isNullable: true,
					},
					{
						name: "phone_verify_expires",
						type: "datetime",
						isNullable: true,
					},
					{
						name: "phone_verify_date",
						type: "datetime",
						isNullable: true,
					},
					{
						name: "email_verified",
						type: "boolean",
						isNullable: true,
					},
					{
						name: "email_verify_code",
						type: "varchar",
						length: "255",
						isNullable: true,
					},
					{
						name: "email_verify_expires",
						type: "datetime",
						isNullable: true,
					},
					{
						name: "email_verify_date",
						type: "datetime",
						isNullable: true,
					},
					{
						name: "payment_method",
						type: "json",
						isNullable: true,
					},
					{ name: "address", type: "json", isNullable: true },
					{ name: "organization", type: "json", isNullable: true },
					{ name: "business", type: "json", isNullable: true },
					{ name: "broker", type: "json", isNullable: true },
					{ name: "individual", type: "json", isNullable: true },
					{ name: "metadata", type: "json", isNullable: true },
					{ name: "fraud_score", type: "int", isNullable: true },
					{
						name: "tos_acceptance",
						type: "json",
						isNullable: true,
					},
					{
						name: "country_code",
						type: "varchar",
						length: "10",
						isNullable: true,
					},
					{ name: "webhooks", type: "json", isNullable: true },
					{
						name: "created_date",
						type: "datetime",
						isNullable: true,
						default: () => "CURRENT_TIMESTAMP",
					},
					{
						name: "last_modified_date",
						type: "timestamp",
						isNullable: false,
						default: () => "CURRENT_TIMESTAMP",
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
