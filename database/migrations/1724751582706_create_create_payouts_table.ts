import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payouts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('amount').notNullable()
      table.string('status').notNullable()
      table.integer('user_id').unsigned().notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}