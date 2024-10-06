import { JSONAPIErrorReporter } from '#validators/validation_reporter'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'The value is not a valid email address',
  'minLength': 'The {{ field }} field must be at least {{ min }} characters long',
  'maxLength': 'The {{ field }} field must be at most {{ max }} characters long',

  // Custom messages for specific fields
  'firstName.required': 'First name is required',
  'firstName.minLength': 'First name must be at least 3 characters long',
  'firstName.maxLength': 'First name must be at most 64 characters long',
  'lastName.required': 'Last name is required',
  'lastName.minLength': 'Last name must be at least 3 characters long',
  'lastName.maxLength': 'Last name must be at most 64 characters long',
  'email.required': 'Email is required',
  'email.email': 'Email must be a valid email address',
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters long',
  'password.maxLength': 'Password must be at most 512 characters long',
  'countryCode.required': 'Country code is required',
  'countryCode.minLength': 'Country code must be at least 2 characters long',
  'countryCode.maxLength': 'Country code must be at most 64 characters long',
})

vine.errorReporter = () => new JSONAPIErrorReporter()
