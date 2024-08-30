import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable()
      table.string('trade_name').notNullable()
      table.string('address').nullable()
      table.string('role').defaultTo('user')
      table.string('phone_number').nullable()
      table.boolean('phone_verified').defaultTo(false)
      table.string('phone_verify_code').nullable()
      table.timestamp('phone_verify_expires', { useTz: true }).nullable()
      table.timestamp('phone_verify_date', { useTz: true }).nullable()
      table.boolean('email_verified').defaultTo(false)
      table.string('email_verify_code').unique().nullable()
      table.timestamp('email_verify_expires', { useTz: true }).nullable()
      table.timestamp('email_verify_date', { useTz: true }).nullable()
      table.boolean('password_reset').nullable()
      table.string('password_reset_token').nullable()
      table.timestamp('password_reset_expires', { useTz: true }).nullable()
      table.boolean('user_locked').defaultTo(false)
      table.string('user_locked_message').nullable()
      table.timestamp('user_locked_date', { useTz: true }).nullable()
      table.string('user_locked_by').nullable()
      table.integer('authy_id').nullable()
      table.string('platform_id').nullable()
      table.string('google_id').nullable()
      table.string('facebook_id').nullable()
      table.string('login_ip').nullable()
      table.timestamp('last_login', { useTz: true }).nullable()
      table.json('metadata').nullable()
      table.boolean('accept_terms').defaultTo(true)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}