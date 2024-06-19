import { Router } from 'express'
import createUserController from '../modules/user/controllers/CreateUserController'

const userRouter = Router()
userRouter.post('/create', createUserController.prototype.createUser)

userRouter.get('/see', async (req, res) => {
  res.json({ message: 'This route works' })
})

export default userRouter
