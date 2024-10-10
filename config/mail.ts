import env from '#start/env'
import { defineConfig, transports, Message } from '@adonisjs/mail'
import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'

export const customTemplateEngine = {
  async render(templatePath: string, data: Record<string, unknown>) {
    const fullPath = path.join(
      import.meta.dirname,
      '../shared/email/templates',
      `${templatePath}.md`
    )
    const template = fs.readFileSync(fullPath, 'utf-8')
    const renderedTemplate = template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
      data[key] ? data[key].toString() : ''
    )
    return marked.parse(renderedTemplate)
  },
}

const mailConfig = defineConfig({
  default: 'resend',
  from: {
    address: 'noreply@vijipay.ng',
    name: 'VijiPay',
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
      /**
       * Uncomment the auth block if your SMTP
       * server needs authentication
       */
      /* auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME'),
        pass: env.get('SMTP_PASSWORD'),
      }, */
    }),

    mailgun: transports.mailgun({
      key: env.get('MAILGUN_API_KEY'),
      baseUrl: 'https://api.mailgun.net/v3',
      domain: env.get('MAILGUN_DOMAIN'),
    }),

    resend: transports.resend({
      key: env.get('RESEND_API_KEY'),
      baseUrl: 'https://api.resend.com',
    }),
  },
})

Message.templateEngine = customTemplateEngine

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
