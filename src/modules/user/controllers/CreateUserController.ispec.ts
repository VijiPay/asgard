import { describe, expect, it, vi } from 'vitest'
import type { Request, Response } from 'express'
import type { IUserCreate } from "../interface/IUserCreate.interface"
import  CreateUserController  from './CreateUserController'
import type  CreateUser  from '../use-cases/CreateUser.usecase'

describe('CreateUserController', () => {
  it('should return 201 and create a new user', async () => {
      const userCreate: IUserCreate = {
        firstName: 'John',
        lastName: 'Doe',
        email: '',
        password: '',
        type: '',
      }
    const createUserUseCase = {
        execute: vi.fn().mockResolvedValue(userCreate),
    } as unknown as CreateUser
    const req = {
        body: userCreate,
    } as unknown as Request
    const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    } as unknown as Response

    const createUserController = new CreateUserController(createUserUseCase)
    await createUserController.createUser(req, res)

    expect(createUserUseCase.execute).toHaveBeenCalledWith(req.body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(userCreate)
  })

})
