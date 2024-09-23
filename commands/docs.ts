import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

export default class Docs extends BaseCommand {
  static commandName = 'docs:generate'
  static description = 'generate documentation for api endpoints'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async interact() {
    console.log('creating api documentation...')
  }

  async run() {
    const Router = await this.app.container.make('router')
    Router.commit()
    await AutoSwagger.default.writeFile(Router.toJSON(), swagger)
  }
  async completed(){
    this.logger.info('api docs generated 🚀')
  }
}