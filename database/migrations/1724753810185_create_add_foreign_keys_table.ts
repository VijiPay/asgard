import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('profiles', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })



    this.schema.alterTable('businesses', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable('transactions', (table) => {
      table.foreign('initiator_id').references('users.id').onDelete('CASCADE')
      table.foreign('receiver_id').references('users.id').onDelete('CASCADE')
      table.foreign('business_id').references('businesses.id').onDelete('SET NULL')
    })

    this.schema.alterTable('payment_methods', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable('payments', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.foreign('transaction_id').references('transactions.id').onDelete('SET NULL')
    })

    this.schema.alterTable('payouts', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable('business_associates', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.foreign('business_id').references('businesses.id').onDelete('CASCADE')
    })

    this.schema.alterTable('api_keys', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable('fraud_scores', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.foreign('transaction_id').references('transactions.id').onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable('profiles', (table) => {
      table.dropForeign(['user_id'])
    })


    this.schema.alterTable('businesses', (table) => {
      table.dropForeign(['user_id'])
    })

    this.schema.alterTable('transactions', (table) => {
      table.dropForeign(['initiator_id', 'receiver_id', 'business_id'])
    })

    this.schema.alterTable('payment_methods', (table) => {
      table.dropForeign(['user_id'])
    })

    this.schema.alterTable('payments', (table) => {
      table.dropForeign(['user_id', 'transaction_id'])
    })

    this.schema.alterTable('payouts', (table) => {
      table.dropForeign(['user_id'])
    })

    this.schema.alterTable('business_associates', (table) => {
      table.dropForeign(['user_id', 'business_id'])
    })

    this.schema.alterTable('api_keys', (table) => {
      table.dropForeign(['user_id'])
    })

    this.schema.alterTable('fraud_scores', (table) => {
      table.dropForeign(['user_id', 'transaction_id'])
    })
  }
}