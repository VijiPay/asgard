import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({
    name: "email",
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: "password",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    name: "firstName",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: "lastName",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: "type",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  type: string;

  @Column({
    name: "nickname",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  nickname: string;

  @Column({
    name: "phone_number",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: "date_of_birth",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  date_of_birth: string;

  @Column({
    name: "role",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  role: string;

  @Column({
    name: "status",
    type: "int",
    default: 1,
    nullable: true,
  })
  status: number;

  @Column({
    name: "login_ip",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  login_ip: string;

  @Column({
    name: "platform_id",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  platform_id: string;

  @Column({
    name: "last_login",
    type: "datetime",
    nullable: true,
  })
  last_login: Date;

  @Column({
    name: "password_reset",
    type: "boolean",
    nullable: true,
  })
  password_reset: boolean;

  @Column({
    name: "password_reset_token",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  password_reset_token: string;

  @Column({
    name: "password_reset_expires",
    type: "datetime",
    nullable: true,
  })
  password_reset_expires: Date;

  @Column({
    name: "user_locked",
    type: "boolean",
    nullable: true,
  })
  user_locked: boolean;

  @Column({
    name: "user_locked_message",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  user_locked_message: string;

  @Column({
    name: "user_locked_date",
    type: "datetime",
    nullable: true,
  })
  user_locked_date: Date;

  @Column({
    name: "user_locked_by",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  user_locked_by: string;

  @Column({
    name: "api_key",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  api_key: string;

  @Column({
    name: "authy_id",
    type: "int",
    nullable: true,
  })
  authy_id: number;

  @Column({
    name: "phone_verified",
    type: "boolean",
    nullable: true,
  })
  phone_verified: boolean;

  @Column({
    name: "phone_verify_code",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phone_verify_code: string;

  @Column({
    name: "phone_verify_expires",
    type: "datetime",
    nullable: true,
  })
  phone_verify_expires: Date;

  @Column({
    name: "phone_verify_date",
    type: "datetime",
    nullable: true,
  })
  phone_verify_date: Date;

  @Column({
    name: "email_verified",
    type: "boolean",
    nullable: true,
  })
  email_verified: boolean;

  @Column({
    name: "email_verify_code",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  email_verify_code: string;

  @Column({
    name: "email_verify_expires",
    type: "datetime",
    nullable: true,
  })
  email_verify_expires: Date;

  @Column({
    name: "email_verify_date",
    type: "datetime",
    nullable: true,
  })
  email_verify_date: Date;

  @Column({
    name: "payment_method",
    type: "json",
    nullable: true,
  })
  payment_method: object;

  @Column({
    name: "address",
    type: "json",
    nullable: true,
  })
  address: object;

  @Column({
    name: "organization",
    type: "json",
    nullable: true,
  })
  organization: object;

  @Column({
    name: "business",
    type: "json",
    nullable: true,
  })
  business: object;

  @Column({
    name: "broker",
    type: "json",
    nullable: true,
  })
  broker: object;

  @Column({
    name: "individual",
    type: "json",
    nullable: true,
  })
  individual: object;

  @Column({
    name: "metadata",
    type: "json",
    nullable: true,
  })
  metadata: object;

  @Column({
    name: "fraud_score",
    type: "int",
    nullable: true,
  })
  fraud_score: number;

  @Column({
    name: "tos_acceptance",
    type: "json",
    nullable: true,
  })
  tos_acceptance: object;

  @Column({
    name: "country_code",
    type: "varchar",
    length: 10,
    nullable: true,
  })
  country_code: string;

  @Column({
    name: "webhooks",
    type: "json",
    nullable: true,
  })
  webhooks: object[];

  @CreateDateColumn({
    name: "created_date",
    type: "datetime",
    nullable: true,
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: "last_modified_date",
    type: "timestamp",
    nullable: false,
  })
  lastModifiedDate: Date;
}
