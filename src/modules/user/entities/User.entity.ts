class UserEntity {
  id?: number
  email: string
  password: string
  firstName: string
  lastName: string
  nickname?: string
  phone?: string
  date_of_birth?: string
  role?: string
  status?: string // user status =  active, inactive, suspended, deleted
  type?: string // user type  =  unknown, individual, business, broker, organization
  login_ip?: string
  platform_id?: string // assigned by the platform when the user is verified
  last_login?: Date
  password_reset?: boolean
  password_reset_token?: string
  password_reset_expires?: Date
  user_locked?: boolean
  user_locked_message?: string
  user_locked_date?: Date
  user_locked_by?: string
  api_key?: string
  authy_id?: number
  phone_verified?: boolean
  phone_verify_code?: string
  phone_verify_expires?: Date
  phone_verify_date?: Date
  email_verified?: boolean
  email_verify_code?: string
  email_verify_expires?: Date
  email_verify_date?: Date
  payment_method?: object
  address?: object
  organization?: object
  business?: object
  broker?: object
  individual?: object
  metadata?: object //store any other information that is not covered by the above fields such as the user's preferences, profile picture, etc
  fraud_score?: number
  tos_acceptance?: object
  country_code?: string
  webhooks?: object[]

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    nickname?: string,
    phone?: string,
    date_of_birth?: string,
    role?: string,
    status?: string,
    type?: string,
    login_ip?: string,
    platform_id?: string,
    last_login?: Date,
    password_reset?: boolean,
    password_reset_token?: string,
    password_reset_expires?: Date,
    user_locked?: boolean,
    user_locked_message?: string,
    user_locked_date?: Date,
    user_locked_by?: string,
    api_key?: string,
    authy_id?: number,
    phone_verified?: boolean,
    phone_verify_code?: string,
    phone_verify_expires?: Date,
    phone_verify_date?: Date,
    email_verified?: boolean,
    email_verify_code?: string,
    email_verify_expires?: Date,
    email_verify_date?: Date,
    payment_method?: object,
    address?: object,
    organization?: object,
    business?: object,
    broker?: object,
    individual?: object,
    metadata?: object,
    fraud_score?: number,
    tos_acceptance?: object,
    country_code?: string,
    webhooks?: object[],
  ) {
   this.email = email
  this.password = password
  this.firstName = firstName
  this.lastName = lastName
  this.nickname = nickname
  this.phone = phone
  this.date_of_birth = date_of_birth
  this.role = role
  this.status = status
  this.type = type
  this.login_ip = login_ip
  this.platform_id = platform_id
  this.last_login = last_login
  this.password_reset = password_reset
  this.password_reset_token = password_reset_token
  this.password_reset_expires = password_reset_expires
  this.user_locked = user_locked
  this.user_locked_message = user_locked_message
  this.user_locked_date = user_locked_date
  this.user_locked_by = user_locked_by
  this.api_key = api_key
  this.authy_id = authy_id
  this.phone_verified = phone_verified
  this.phone_verify_code = phone_verify_code
  this.phone_verify_expires = phone_verify_expires
  this.phone_verify_date = phone_verify_date
  this.email_verified = email_verified
  this.email_verify_code = email_verify_code
  this.email_verify_expires = email_verify_expires
  this.email_verify_date = email_verify_date
  this.payment_method = payment_method
  this.address = address
  this.organization = organization
  this.business = business
  this.broker = broker
  this.individual = individual
  this.metadata = metadata
  this.fraud_score = fraud_score
  this.tos_acceptance = tos_acceptance
  this.country_code = country_code
  this.webhooks = webhooks
  }
}

export default UserEntity
