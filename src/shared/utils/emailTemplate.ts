import fs from "node:fs/promises";
import { resolve } from "node:path";

import { marked } from "marked";
import { memDecorator } from "mem";
import * as Mustache from "mustache";
import { FOLDER_TEMPLATE_NAME, LAYOUT_PATH } from "../constants";
import type {
	EmailResponse,
	IEmailData,
} from "../services/email/IEmailService";

export class EmailTemplateUtil {
	async getMessage(options: IEmailData): Promise<EmailResponse> {
		const template = await this.getTemplateByPath(options.templatePath);

		const markdownRaw = Mustache.render(template, options.data);

		const subject = this.getSubjectFromMarkdown(markdownRaw);
		const markdown = this.transformMarkdown(markdownRaw, { subject });
		const html = await this.convertMarkdownToHtml(markdownRaw, options);

		return { markdown, subject, html };
	}

	@memDecorator()
	protected async getTemplateByPath(path: string) {
		const newPath = path.endsWith(".html") ? path : `${path}.md`;

		return fs.readFile(resolve(FOLDER_TEMPLATE_NAME, newPath), "utf8");
	}

	private async convertMarkdownToHtml(markdown: string, options: IEmailData) {
		const layout = await this.getTemplateByPath(LAYOUT_PATH);

		if (options.isHTML && options.isLayout) {
			return Mustache.render(layout, { content: marked(markdown) });
		}

		if (options.isHTML) {
			return marked(markdown);
		}

		return "";
	}

	private getSubjectFromMarkdown(markdown: string) {
		if (markdown?.startsWith("#")) {
			return markdown.split("\n", 1)?.[0]?.replace("#", "").trim() || "";
		}

		return "";
	}

	private transformMarkdown(
		markdown: string,
		{ subject }: Pick<EmailResponse, "subject">,
	) {
		if (subject) {
			return markdown.replace(`# ${subject}`, "").trim();
		}

		return markdown;
	}
}
