import { CustomException } from '#exceptions/custom_exception'
import { Email } from '#services/email_service'
import UserService from '#services/user_service'
import ResponseDTO from '#shared/dtos/response_dto'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import httpStatus from 'http-status'
import { EmailTemplatePath } from '#shared/email/template_path'

@inject()
export default class UsersController {
  constructor(
    protected uService: UserService,
    protected email: Email
  ) {}

  async getAllUsers() {
    const data = await this.uService.getAll()
    return ResponseDTO.success('Users retrieved successfully', data)
  }

  public async getUserbyId({ params }: HttpContext) {
    const id = Number(params.id)
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new CustomException('Expected a number', httpStatus.BAD_REQUEST)
    }
    const data = await this.uService.getById(id)
    if (!data) {
      throw new CustomException('User Not found', httpStatus.NOT_FOUND)
    }
    return ResponseDTO.success('User retrieved successfully', data)
  }

  public async getUserbyEmail({ params }: HttpContext) {
    const data = await this.uService.getByEmail(params.email)

    if (!data) {
      throw new CustomException('User Not found', httpStatus.NOT_FOUND)
    }

    return ResponseDTO.success('User retrieved successfully', data)
  }

  public async create({ request }: HttpContext) {
    const userData = await request.validateUsing(registerValidator)

    const data = await this.uService.create(userData)
    if (data) {
      const emailReq = {
        recipient: userData.email,
        templatePath: EmailTemplatePath.REGISTRATION,
        bcc: ['davidshemang@gmail.com'],
        data: { name: `${userData.firstName} ${userData.lastName}` },
      }
      console.log(emailReq)
      this.email.send(emailReq)
    }
    return ResponseDTO.success('User created successfully', data)
  }

  public async oauthSignUp({ request }: HttpContext) {
    const userData = request.only([
      'email',
      'firstName',
      'lastName',
      'countryCode',
      'googleId',
      'facebookId',
      'loginIp',
    ])
    const data = await this.uService.create(userData)
    return ResponseDTO.success('User registered successfully', data)
  }

  public async update({ params, request }: HttpContext) {
    const userData = request.only(['email', 'firstName', 'lastName', 'countryCode'])
    const data = await this.uService.update(params.id, userData)
    return ResponseDTO.success('User updated successfully', data)
  }

  public async delete({ params }: HttpContext) {
    await this.uService.delete(params.id)
    return ResponseDTO.success('User deleted successfully')
  }

  public async changePassword({ params, request }: HttpContext) {
    const { newPassword } = request.only(['newPassword'])
    const data = await this.uService.changePassword(params.id, newPassword)
    return ResponseDTO.success('Password changed successfully', data)
  }

  public async lockUser({ params, request }: HttpContext) {
    const { reason, lockingUserId } = request.only(['reason', 'lockingUserId'])
    const data = await this.uService.lockUser(params.id, reason, lockingUserId)
    return ResponseDTO.success('User locked successfully', data)
  }

  public async unlockUser({ params, request }: HttpContext) {
    const { unlockingUserId } = request.only(['unlockingUserId'])
    const data = await this.uService.unlockUser(params.id, unlockingUserId)
    return ResponseDTO.success('User unlocked successfully', data)
  }
}
