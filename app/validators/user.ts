import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3).maxLength(64),
    lastName: vine.string().minLength(3).maxLength(64),
    email: vine
      .string()
      .email(),
    password: vine.string().minLength(8).maxLength(512),
    countryCode: vine.string().minLength(2).maxLength(64),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email(),
    password: vine.string().minLength(8).maxLength(512),
  })
)
