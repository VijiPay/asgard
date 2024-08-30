import { UserService } from "#services/user_service";
import ResponseDTO from "#shared/dtos/response_dto";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class UserController {

  constructor(private userService: UserService) { }

  public async getAllUsers() {
    const users = await this.userService.getAll()
    return ResponseDTO.success('Users retrieved successfully', users)
  }

  public async getUser({ params, response }: HttpContext) {
    const user = await this.userService.getById(params.id)
    return response.json(ResponseDTO.success('User retrieved successfully', user))
  }

  public async create({ request, response }: HttpContext) {
    console.log('creating')
    const userData = request.only(['email', 'password', 'firstName', 'lastName', 'countryCode'])
    const user = await this.userService.create(userData)
    return response.status(201).json(ResponseDTO.created('User created successfully', user))
  }

   public async oauthSignUp({ request, response }: HttpContext) {
    const userData = request.only(['email', 'firstName', 'lastName', 'countryCode', 'googleId', 'facebookId', 'loginIp'])
    const user = await this.userService.create(userData)
    return response.status(201).json(ResponseDTO.created('User registered successfully', user))
  }

  public async update({ params, request, response }: HttpContext) {
    const userData = request.only(['email', 'firstName', 'lastName', 'countryCode'])
    const user = await this.userService.update(params.id, userData)
    return response.json(ResponseDTO.success('User updated successfully', user))
  }

  public async delete({ params, response }: HttpContext) {
    await this.userService.delete(params.id)
    return response.json(ResponseDTO.success('User deleted successfully'))
  }

  public async changePassword({ params, request, response }: HttpContext) {
    const { newPassword } = request.only(['newPassword'])
    const user = await this.userService.changePassword(params.id, newPassword)
    return response.json(ResponseDTO.success('Password changed successfully', user))
  }

  public async lockUser({ params, request, response }: HttpContext) {
    const { reason, lockingUserId } = request.only(['reason', 'lockingUserId'])
    const user = await this.userService.lockUser(params.id, reason, lockingUserId)
    return response.json(ResponseDTO.success('User locked successfully', user))
  }

  public async unlockUser({ params, response }: HttpContext) {
    const user = await this.userService.unlockUser(params.id)
    return response.json(ResponseDTO.success('User unlocked successfully', user))
  }
}
