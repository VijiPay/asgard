import { CustomException } from '#exceptions/custom_exception'
import { EmailTemplateUtil } from '#shared/email/email_template_util'
import { EmailTemplateOption, IEmail } from '#shared/email/i_email'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'
import httpStatus from 'http-status'
httpStatus

@inject()
export class Email implements IEmail {
  constructor(protected emailTemplateUtil: EmailTemplateUtil) {}

  async send(data: EmailTemplateOption): Promise<void> {
    const { html, subject, recipient, bcc } = await this.emailTemplateUtil.getMessage(data)
    if (!html) {
      throw new CustomException('HTML Layout is required', httpStatus.EXPECTATION_FAILED)
    }
    await mail.sendLater((message) => {
      message.to(recipient).subject(subject).html(html)
      if (bcc) {
        message.bcc(bcc)
      }
    })
  }
}
