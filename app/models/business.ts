import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js';
import BusinessAssociate from './business_associate.js';
import Transaction from './transaction.js';


export default class Business extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare registrationNumber: string

  @column()
  declare registrationStatus: string

  @column()
  declare phoneNumber: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => BusinessAssociate)
  declare linkedUsers: HasMany<typeof BusinessAssociate>

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>
}