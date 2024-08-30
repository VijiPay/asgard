import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js';
import Transaction from './transaction.js';

export default class FraudScore extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare score: number

  @column()
  declare reason: string

  @column()
  declare action: string

  @column()
  declare userId: number

  @column()
  declare transactionId: number | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Transaction)
  declare transaction: BelongsTo<typeof Transaction>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}