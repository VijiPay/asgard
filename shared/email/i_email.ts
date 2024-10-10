import type { EmailTemplatePath } from '#shared/email/template_path'

export type EmailTemplateOption = {
  recipient: string
  bcc?: string[]
  data?: Record<string, number | string | boolean>
  hasAttachment?: boolean
  isHTML?: boolean
  isLayout?: boolean
  templatePath: EmailTemplatePath
}

export interface IEmail {
  send(data: EmailTemplateOption): Promise<void>
}

export interface EmailResponse {
  html?: string
  markdown: string
  subject: string
  bcc?: string[]
  recipient: string
}
