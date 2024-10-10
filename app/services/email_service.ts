import { EmailTemplateOption, IEmail } from '#shared/email/i_email'
import { Message } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'

export class Email implements IEmail {
  async send(data: EmailTemplateOption): Promise<void> {
    const emailMessage = {
      to: data.to,
      bcc: data.bcc ? data.bcc : undefined,
      subject: data.subject,
      html: await Message.templateEngine!.render(data.templatePath, data.data),
    }

    await mail.send((message) => {
      message.to(emailMessage.to.join(', ')).subject(emailMessage.subject).html(emailMessage.html)
      if (emailMessage.bcc) {
        message.bcc(emailMessage.bcc)
      }
    })
  }
}
