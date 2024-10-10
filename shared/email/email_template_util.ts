import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import { marked } from 'marked'
import Mustache from 'mustache'
import type { EmailResponse, EmailTemplateOption } from '#shared/email/i_email'
import { FOLDER_TEMPLATE_NAME, LAYOUT_PATH } from '#shared/email/template_path'

export class EmailTemplateUtil {
  async getMessage(options: EmailTemplateOption): Promise<EmailResponse> {
    const template = await this.getTemplateByPath(options.templatePath)
    const markdownRaw = Mustache.render(template, options.data)
    const subject = this.getSubjectFromMarkdown(markdownRaw)
    const html = await this.convertMarkdownToHtml(markdownRaw)

    return { markdown: markdownRaw, subject, html, bcc: options.bcc, recipient: options.recipient }
  }

  protected async getTemplateByPath(path: string) {
    const newPath = path.endsWith('.html') ? path : `${path}.md`
    return fs.readFile(resolve(FOLDER_TEMPLATE_NAME, newPath), 'utf8')
  }

  private async convertMarkdownToHtml(markdown: string) {
    const layout = await this.getTemplateByPath(LAYOUT_PATH)
    return Mustache.render(layout, { content: marked(markdown) })
  }

  private getSubjectFromMarkdown(markdown: string) {
    if (markdown?.startsWith('#')) {
      return markdown.split('\n', 1)?.[0]?.replace('#', '').trim() || ''
    }
    return ''
  }
}
