import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "sab",
})
export class SabEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    field: "email",
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "password",
  })
  password!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "first_name",
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "last_name",
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: "type",
  })
  type?: string; // user type  =  unknown, individual, business, broker, organization

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "nickname",
  })
  nickname?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: "phone",
  })
  phone?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: "date_of_birth",
  })
  date_of_birth?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: "role",
  })
  role?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: "status",
  })
  status?: string; // user status =  active, inactive, suspended, deleted

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: "login_ip",
  })
  login_ip?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: "platform_id",
  })
  platform_id?: string; // assigned by the platform when the user is verified

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "last_login",
  })
  last_login?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "password_reset",
  })
  password_reset?: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "password_reset_token",
  })
  password_reset_token?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "password_reset_expires",
  })
  password_reset_expires?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "user_locked",
  })
  user_locked?: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "user_locked_message",
  })
  user_locked_message?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "user_locked_date",
  })
  user_locked_date?: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "user_locked_by",
  })
  user_locked_by?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "api_key",
  })
  api_key?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "authy_id",
  })
  authy_id?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "phone_verified",
  })
  phone_verified?: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "phone_verify_code",
  })
  phone_verify_code?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "phone_verify_expires",
  })
  phone_verify_expires?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "phone_verify_date",
  })
  phone_verify_date?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "email_verified",
  })
  email_verified?: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: "email_verify_code",
  })
  email_verify_code?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "email_verify_expires",
  })
  email_verify_expires?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "email_verify_date",
  })
  email_verify_date?: Date;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "payment_method",
  })
  payment_method?: object;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "address",
  })
  address?: object;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "organization",
  })
  organization?: object;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "business",
  })
  business?: object;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "broker",
  })
  broker?: object;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "individual",
  })
  individual?: object;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "metadata",
  })
  metadata?: object; //store any other information that is not covered by the above fields such as the user's preferences, profile picture, etc

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "fraud_score",
  })
  fraud_score?: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "tos_acceptance",
  })
  tos_acceptance?: object;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "country_code",
  })
  country_code?: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "webhooks",
  })
  webhooks?: object[];
}
