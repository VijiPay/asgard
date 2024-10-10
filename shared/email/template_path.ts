import { resolve } from 'node:path'

export enum EmailTemplatePath {
  EMAIL_CONFIRMED = 'auth/email-confirmed',
  EMAIL_VERIFICATION = 'auth/email-verification',
  FORGOT_PASSWORD_BY_EMAIL = 'auth/forgot-password-by-email',
  PASSWORD_CHANGED = 'user/password-changed',
  PHONE_VERIFICATION = 'auth/phone-verification',
  REGISTRATION = 'user/registration',
}

export const FOLDER_TEMPLATE_NAME = resolve(import.meta.dirname, 'templates')
export const LAYOUT_PATH = resolve(FOLDER_TEMPLATE_NAME, 'layout.html')
