import type { EmailTemplatePath } from '#shared/email/template_path'

export type EmailTemplateOption = {
  to: string[]
  bcc?: string[]
  subject: string
  data?: Record<string, number | string | boolean>
  hasAttachment?: boolean
  templatePath: EmailTemplatePath
}

export interface IEmail {
  send(data: EmailTemplateOption): Promise<void>
}
